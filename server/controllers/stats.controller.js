const prisma = require('../utils/db');

// GET /api/stats/trending — top places by views
async function getTrending(req, res) {
  try {
    const places = await prisma.place.findMany({
      where: { isPublished: true },
      orderBy: { viewCount: 'desc' },
      take: 10,
      include: { images: { where: { isCover: true }, take: 1 } },
    });

    res.json({
      trending: places.map(p => ({
        id: p.id, nameTh: p.nameTh, nameEn: p.nameEn,
        slug: p.slug, category: p.category,
        viewCount: p.viewCount,
        img: p.images[0]?.imageUrl || null,
      })),
    });
  } catch (err) {
    console.error('Trending error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// GET /api/stats/categories — visits per category
async function getCategoryStats(req, res) {
  try {
    const stats = await prisma.place.groupBy({
      by: ['category'],
      _sum: { viewCount: true },
      _count: { id: true },
      orderBy: { _sum: { viewCount: 'desc' } },
    });

    res.json({
      categories: stats.map(s => ({
        category: s.category,
        totalViews: s._sum.viewCount || 0,
        placeCount: s._count.id,
      })),
    });
  } catch (err) {
    console.error('Category stats error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// GET /api/admin/stats/overview — dashboard summary
async function getOverview(req, res) {
  try {
    const [totalUsers, totalPlaces, pendingReviews, totalReviews] = await Promise.all([
      prisma.user.count(),
      prisma.place.count(),
      prisma.review.count({ where: { status: 'pending' } }),
      prisma.review.count(),
    ]);

    res.json({ totalUsers, totalPlaces, pendingReviews, totalReviews });
  } catch (err) {
    console.error('Overview error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

module.exports = { getTrending, getCategoryStats, getOverview };
