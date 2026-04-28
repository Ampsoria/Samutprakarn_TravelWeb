const prisma = require('../utils/db');
const { z } = require('zod');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  fullName: z.string().min(2, 'กรุณากรอกชื่อ-นามสกุล'),
  interests: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
});

// POST /api/auth/register
async function register(req, res) {
  try {
    const data = registerSchema.parse(req.body);

    // Check if email exists
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว / Email already in use' });
    }

    const passwordHash = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        fullName: data.fullName,
        interests: data.interests || '',
      },
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      message: 'ลงทะเบียนสำเร็จ / Registered successfully',
      user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error('Register error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด / Server error' });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง / Invalid credentials' });
    }

    const isValid = await comparePassword(data.password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง / Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ / Login successful',
      user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error('Login error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด / Server error' });
  }
}

// POST /api/auth/refresh
async function refresh(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'กรุณาส่ง refreshToken' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Token ไม่ถูกต้อง' });
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Refresh token หมดอายุ กรุณาเข้าสู่ระบบใหม่' });
  }
}

// POST /api/auth/logout
async function logout(req, res) {
  // In a stateless JWT system, we just tell the client to remove tokens
  res.json({ message: 'ออกจากระบบสำเร็จ / Logged out' });
}

module.exports = { register, login, refresh, logout };
