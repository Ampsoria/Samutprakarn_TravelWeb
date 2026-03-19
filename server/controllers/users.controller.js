const prisma = require('../utils/db');

// GET /api/profile
async function getProfile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, email: true, fullName: true, avatarUrl: true,
        role: true, interests: true, langPref: true, createdAt: true,
        _count: {
          select: {
            reviews: { where: { status: 'approved' } },
            bookmarks: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });

    res.json({
      ...user,
      reviewCount: user._count.reviews,
      bookmarkCount: user._count.bookmarks,
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// PUT /api/profile
async function updateProfile(req, res) {
  try {
    const { fullName, interests, langPref } = req.body;
    const data = {};
    if (fullName) data.fullName = fullName;
    if (interests !== undefined) data.interests = interests;
    if (langPref) data.langPref = langPref;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
      select: { id: true, email: true, fullName: true, interests: true, langPref: true },
    });

    res.json({ message: 'อัปเดตโปรไฟล์สำเร็จ', user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// GET /api/admin/users
async function getUsers(req, res) {
  try {
    const { q, role } = req.query;
    const where = {};
    if (role) where.role = role;
    if (q) {
      where.OR = [
        { fullName: { contains: q } },
        { email: { contains: q } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, email: true, fullName: true, role: true,
        isActive: true, createdAt: true,
        _count: { select: { reviews: true, bookmarks: true } },
      },
    });
    res.json({ users });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// PATCH /api/admin/users/:id — edit role / suspend
async function updateUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { role, isActive } = req.body;
    const data = {};
    if (role) data.role = role;
    if (isActive !== undefined) data.isActive = isActive;

    const user = await prisma.user.update({ where: { id }, data });
    res.json({ message: 'อัปเดตผู้ใช้สำเร็จ', user: { id: user.id, role: user.role, isActive: user.isActive } });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// DELETE /api/admin/users/:id
async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'ลบผู้ใช้สำเร็จ' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

module.exports = { getProfile, updateProfile, getUsers, updateUser, deleteUser };
