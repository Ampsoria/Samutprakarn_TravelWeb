require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const prisma = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Security Middleware ---
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for existing frontend
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false, // Allow loading external images
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// --- Logging ---
app.use(morgan('dev'));

// --- Body Parsing ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rate Limiting ---
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  message: { error: 'คำขอมากเกินไป กรุณารอ 15 นาที / Too many requests' },
});

// --- Health Check (for cloud monitoring) ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- API Routes ---
app.use('/api/auth', authLimiter, require('./routes/auth.routes'));
app.use('/api/places', require('./routes/places.routes'));
app.use('/api', require('./routes/reviews.routes'));
app.use('/api/bookmarks', require('./routes/bookmarks.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/api/stats', require('./routes/stats.routes'));

// --- Serve Static Frontend Files ---
// Serve from project root (where HTML files are)
app.use(express.static(path.join(__dirname, '..'), {
  etag: false,
  maxAge: 0,
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  }
}));

// Fallback: serve home.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'home.html'));
});

// --- Error Handler (Express 5 compatible) ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ / Internal server error'
      : (err.message || 'Internal server error'),
  });
});

// --- Start Server ---
const HOST = process.env.HOST || '0.0.0.0';
const server = app.listen(PORT, HOST, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║  🚀 Samutprakan Travel API Server             ║
  ║  📡 Running on http://${HOST}:${PORT}             ║
  ║  📦 Environment: ${(process.env.NODE_ENV || 'development').padEnd(16)}║
  ╚═══════════════════════════════════════════════╝
  `);
});

// --- Graceful Shutdown ---
const shutdown = async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

module.exports = app;
