const prisma = require('../utils/db');

// GET /api/places/:placeId/reviews — public approved reviews
async function getReviews(req, res) {
  try {
    const placeId = parseInt(req.params.placeId);
    const reviews = await prisma.review.findMany({
      where: { placeId, status: 'approved' },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, fullName: true } } },
    });
    res.json({ reviews });
  } catch (err) {
    console.error('Get reviews error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// POST /api/places/:placeId/reviews — [User] create review
async function createReview(req, res) {
  try {
    const placeId = parseInt(req.params.placeId);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating ต้องอยู่ระหว่าง 1-5' });
    }

    // Check if user already reviewed this place
    const existing = await prisma.review.findUnique({
      where: { placeId_userId: { placeId, userId: req.user.id } },
    });
    if (existing) {
      return res.status(400).json({ error: 'คุณรีวิวสถานที่นี้ไปแล้ว / Already reviewed' });
    }

    const review = await prisma.review.create({
      data: {
        placeId,
        userId: req.user.id,
        rating: parseInt(rating),
        comment: comment || '',
        status: 'pending',
      },
    });

    res.status(201).json({ message: 'รีวิวถูกส่งเพื่อตรวจสอบ / Review submitted for moderation', review });
  } catch (err) {
    console.error('Create review error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// GET /api/admin/reviews — [Admin] all reviews with optional status filter
async function getAdminReviews(req, res) {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, fullName: true, email: true } },
        place: { select: { id: true, nameTh: true, nameEn: true, slug: true } },
      },
    });
    res.json({ reviews });
  } catch (err) {
    console.error('Admin reviews error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// PATCH /api/admin/reviews/:id — [Admin] approve/reject review
async function moderateReview(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status ต้องเป็น approved หรือ rejected' });
    }

    const review = await prisma.review.update({
      where: { id },
      data: {
        status,
        reviewedById: req.user.id,
        reviewedAt: new Date(),
      },
    });

    res.json({ message: `รีวิว ${status === 'approved' ? 'อนุมัติ' : 'ปฏิเสธ'} สำเร็จ`, review });
  } catch (err) {
    console.error('Moderate review error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// DELETE /api/admin/reviews/:id — [Admin] delete review
async function deleteReview(req, res) {
  try {
    const id = parseInt(req.params.id);
    await prisma.review.delete({ where: { id } });
    res.json({ message: 'ลบรีวิวสำเร็จ' });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

module.exports = { getReviews, createReview, getAdminReviews, moderateReview, deleteReview };
