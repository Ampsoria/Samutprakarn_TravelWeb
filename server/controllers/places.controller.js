const prisma = require('../utils/db');

// GET /api/places — list with search, filter, pagination
async function getPlaces(req, res) {
  try {
    const { q, category, amphoe, sort = 'newest', page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isPublished: true };
    if (category) where.category = category;
    if (amphoe) where.amphoe = amphoe;
    if (q) {
      where.OR = [
        { nameTh: { contains: q } },
        { nameEn: { contains: q } },
        { descriptionTh: { contains: q } },
        { descriptionEn: { contains: q } },
      ];
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'popular') orderBy = { viewCount: 'desc' };
    if (sort === 'name') orderBy = { nameTh: 'asc' };
    if (sort === 'price_low') orderBy = { price: 'asc' };

    const [places, total] = await Promise.all([
      prisma.place.findMany({
        where,
        orderBy,
        skip,
        take: parseInt(limit),
        include: {
          images: { where: { isCover: true }, take: 1 },
          _count: { select: { reviews: { where: { status: 'approved' } } } },
        },
      }),
      prisma.place.count({ where }),
    ]);

    // Compute avg rating for each place
    const placesWithRating = await Promise.all(
      places.map(async (p) => {
        const agg = await prisma.review.aggregate({
          where: { placeId: p.id, status: 'approved' },
          _avg: { rating: true },
        });
        return {
          id: p.id,
          nameTh: p.nameTh,
          nameEn: p.nameEn,
          slug: p.slug,
          category: p.category,
          amphoe: p.amphoe,
          price: p.price,
          viewCount: p.viewCount,
          img: p.images[0]?.imageUrl || null,
          rating: agg._avg.rating ? parseFloat(agg._avg.rating.toFixed(1)) : 0,
          reviewCount: p._count.reviews,
        };
      })
    );

    res.json({
      places: placesWithRating,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Get places error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// GET /api/places/:slug — single place detail
async function getPlace(req, res) {
  try {
    const { slug } = req.params;
    const place = await prisma.place.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        reviews: {
          where: { status: 'approved' },
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { id: true, fullName: true } } },
        },
      },
    });

    if (!place) {
      return res.status(404).json({ error: 'ไม่พบสถานที่ / Place not found' });
    }

    // Increment view count
    await prisma.place.update({
      where: { id: place.id },
      data: { viewCount: { increment: 1 } },
    });

    // Avg rating
    const agg = await prisma.review.aggregate({
      where: { placeId: place.id, status: 'approved' },
      _avg: { rating: true },
    });

    res.json({
      ...place,
      rating: agg._avg.rating ? parseFloat(agg._avg.rating.toFixed(1)) : 0,
      img: place.images.find(i => i.isCover)?.imageUrl || place.images[0]?.imageUrl || null,
    });
  } catch (err) {
    console.error('Get place error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// POST /api/places — [Admin] create new place
async function createPlace(req, res) {
  try {
    const { nameTh, nameEn, category, amphoe, descriptionTh, descriptionEn, price, imageUrl } = req.body;

    // Generate slug from nameEn or nameTh
    const slug = (nameEn || nameTh)
      .toLowerCase()
      .replace(/[^a-z0-9ก-๙\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100) + '-' + Date.now();

    const place = await prisma.place.create({
      data: {
        nameTh,
        nameEn: nameEn || nameTh,
        slug,
        category: category || 'nature',
        amphoe: amphoe || 'mueang',
        descriptionTh,
        descriptionEn,
        price: parseInt(price) || 0,
        createdById: req.user ? req.user.id : null,
      },
    });

    // Create cover image if URL provided
    if (imageUrl) {
      await prisma.placeImage.create({
        data: {
          placeId: place.id,
          imageUrl,
          altText: nameTh,
          isCover: true,
        },
      });
    }

    res.status(201).json({ message: 'เพิ่มสถานที่สำเร็จ', place });
  } catch (err) {
    console.error('Create place error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// PUT /api/places/:id — [Admin] update place
async function updatePlace(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { imageUrl, ...placeData } = req.body;

    // Update place fields
    const place = await prisma.place.update({
      where: { id },
      data: placeData,
    });

    // Update or create cover image if imageUrl provided
    if (imageUrl) {
      const existingImage = await prisma.placeImage.findFirst({
        where: { placeId: id, isCover: true },
      });
      if (existingImage) {
        await prisma.placeImage.update({
          where: { id: existingImage.id },
          data: { imageUrl, altText: placeData.nameTh || place.nameTh },
        });
      } else {
        await prisma.placeImage.create({
          data: {
            placeId: id,
            imageUrl,
            altText: placeData.nameTh || place.nameTh,
            isCover: true,
          },
        });
      }
    }

    res.json({ message: 'อัปเดตสถานที่สำเร็จ', place });
  } catch (err) {
    console.error('Update place error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// DELETE /api/places/:id — [Admin] delete place
async function deletePlace(req, res) {
  try {
    const id = parseInt(req.params.id);
    await prisma.place.delete({ where: { id } });
    res.json({ message: 'ลบสถานที่สำเร็จ' });
  } catch (err) {
    console.error('Delete place error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

module.exports = { getPlaces, getPlace, createPlace, updatePlace, deletePlace };
