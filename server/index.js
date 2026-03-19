require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Security Middleware ---
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for existing frontend
  crossOriginEmbedderPolicy: false,
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

// --- API Routes ---
app.use('/api/auth', authLimiter, require('./routes/auth.routes'));
app.use('/api/places', require('./routes/places.routes'));
app.use('/api', require('./routes/reviews.routes'));
app.use('/api/bookmarks', require('./routes/bookmarks.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/api/stats', require('./routes/stats.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/survey', require('./routes/survey.routes'));

// --- Serve Uploaded Images ---
const uploadsPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '..', 'data', 'uploads')
  : path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// --- Serve Static Frontend Files ---
// Serve from project root (where HTML files are)
app.use(express.static(path.join(__dirname, '..')));

// Fallback: serve home.html for root (no login required)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'home.html'));
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ / Internal server error' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║  🚀 Samutprakan Travel API Server             ║
  ║  📡 Running on http://localhost:${PORT}          ║
  ║  📦 Environment: ${process.env.NODE_ENV || 'development'}            ║
  ╚═══════════════════════════════════════════════╝
  `);
});

module.exports = app;
