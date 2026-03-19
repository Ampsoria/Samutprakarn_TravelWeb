const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const { getTrending, getCategoryStats, getOverview, getDashboardStats } = require('../controllers/stats.controller');

// Public stats
router.get('/trending', getTrending);
router.get('/categories', getCategoryStats);
router.get('/dashboard', getDashboardStats);

// Admin stats
router.get('/admin/overview', authenticate, adminOnly, getOverview);

module.exports = router;
