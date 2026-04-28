function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'คุณไม่มีสิทธิ์เข้าถึง / Admin access only' });
  }
  next();
}

module.exports = { adminOnly };
