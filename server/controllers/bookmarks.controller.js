const prisma = require('../utils/db');

// GET /api/bookmarks — [User] list bookmarks
async function getBookmarks(req, res) {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        place: {
          include: { images: { where: { isCover: true }, take: 1 } },
        },
      },
    });

    const result = bookmarks.map(b => ({
      id: b.id,
      placeId: b.place.id,
      nameTh: b.place.nameTh,
      nameEn: b.place.nameEn,
      slug: b.place.slug,
      category: b.place.category,
      amphoe: b.place.amphoe,
      img: b.place.images[0]?.imageUrl || null,
      createdAt: b.createdAt,
    }));

    res.json({ bookmarks: result });
  } catch (err) {
    console.error('Get bookmarks error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// POST /api/bookmarks — [User] add bookmark
async function addBookmark(req, res) {
  try {
    const { placeId } = req.body;
    if (!placeId) return res.status(400).json({ error: 'กรุณาระบุ placeId' });

    const existing = await prisma.bookmark.findUnique({
      where: { userId_placeId: { userId: req.user.id, placeId: parseInt(placeId) } },
    });
    if (existing) {
      return res.status(400).json({ error: 'บันทึกไว้แล้ว / Already bookmarked' });
    }

    const bookmark = await prisma.bookmark.create({
      data: { userId: req.user.id, placeId: parseInt(placeId) },
    });
    res.status(201).json({ message: 'บันทึกสำเร็จ / Bookmarked', bookmark });
  } catch (err) {
    console.error('Add bookmark error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// DELETE /api/bookmarks/:placeId — [User] remove bookmark
async function removeBookmark(req, res) {
  try {
    const placeId = parseInt(req.params.placeId);
    await prisma.bookmark.delete({
      where: { userId_placeId: { userId: req.user.id, placeId } },
    });
    res.json({ message: 'ลบออกจากรายการโปรดแล้ว / Removed' });
  } catch (err) {
    console.error('Remove bookmark error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// GET /api/bookmarks/check/:placeId — [User] check if bookmarked
async function checkBookmark(req, res) {
  try {
    const placeId = parseInt(req.params.placeId);
    const existing = await prisma.bookmark.findUnique({
      where: { userId_placeId: { userId: req.user.id, placeId } },
    });
    res.json({ bookmarked: !!existing });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

module.exports = { getBookmarks, addBookmark, removeBookmark, checkBookmark };
