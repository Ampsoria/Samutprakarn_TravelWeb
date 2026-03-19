const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Category name mapping
const categoryNames = {
  nature: 'ธรรมชาติ',
  temple: 'วัด',
  history: 'ประวัติศาสตร์',
  art: 'ศิลปะ',
  food: 'อาหาร',
  cafe: 'คาเฟ่',
  shopping: 'ช้อปปิ้ง',
  museum: 'พิพิธภัณฑ์',
};

// GET /api/stats/trending
async function getTrending(req, res) {
  try {
    const places = await prisma.place.findMany({
      orderBy: { viewCount: 'desc' },
      take: 10,
      include: { images: { where: { isCover: true }, take: 1 } },
    });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/stats/categories
async function getCategoryStats(req, res) {
  try {
    const stats = await prisma.place.groupBy({
      by: ['category'],
      _count: { id: true },
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/stats/admin/overview
async function getOverview(req, res) {
  try {
    const [users, places, reviews] = await Promise.all([
      prisma.user.count(),
      prisma.place.count(),
      prisma.review.count({ where: { status: 'pending' } }),
    ]);
    res.json({ users, places, pendingReviews: reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/stats/dashboard — Full dashboard statistics
async function getDashboardStats(req, res) {
  try {
    const [totalUsers, totalPlaces, totalReviews, pendingReviews, totalBookmarks] = await Promise.all([
      prisma.user.count(),
      prisma.place.count(),
      prisma.review.count(),
      prisma.review.count({ where: { status: 'pending' } }),
      prisma.bookmark.count(),
    ]);

    // Places by category
    const placesByCategory = await prisma.place.groupBy({
      by: ['category'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    });

    // Average rating per place
    const placesWithReviews = await prisma.place.findMany({
      where: { reviews: { some: {} } },
      select: {
        id: true, nameTh: true, category: true, viewCount: true,
        reviews: { select: { rating: true } },
      },
    });

    const placeRatings = placesWithReviews
      .map(p => ({
        id: p.id,
        name: p.nameTh,
        category: p.category,
        viewCount: p.viewCount,
        avgRating: p.reviews.length > 0
          ? +(p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length).toFixed(1)
          : 0,
        reviewCount: p.reviews.length,
      }))
      .sort((a, b) => b.avgRating - a.avgRating);

    // Top viewed places
    const topViewed = await prisma.place.findMany({
      orderBy: { viewCount: 'desc' },
      take: 5,
      select: { id: true, nameTh: true, viewCount: true, category: true },
    });

    // Rating distribution (1-5 stars)
    const ratingDistribution = await prisma.review.groupBy({
      by: ['rating'],
      _count: { id: true },
      orderBy: { rating: 'asc' },
    });

    // Recent reviews (last 5)
    const recentReviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true, rating: true, comment: true, status: true, createdAt: true,
        user: { select: { fullName: true } },
        place: { select: { nameTh: true } },
      },
    });

    res.json({
      summary: { totalUsers, totalPlaces, totalReviews, pendingReviews, totalBookmarks },
      placesByCategory: placesByCategory.map(c => ({
        category: c.category,
        categoryName: categoryNames[c.category] || c.category,
        count: c._count.id,
      })),
      placeRatings,
      topViewed,
      ratingDistribution: ratingDistribution.map(r => ({ rating: r.rating, count: r._count.id })),
      recentReviews: recentReviews.map(r => ({
        id: r.id, rating: r.rating, comment: r.comment, status: r.status,
        userName: r.user.fullName, placeName: r.place.nameTh, createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

module.exports = { getTrending, getCategoryStats, getOverview, getDashboardStats };
