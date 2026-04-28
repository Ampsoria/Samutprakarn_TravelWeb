const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const { getTrending, getCategoryStats, getOverview } = require('../controllers/stats.controller');

// Public stats
router.get('/trending', getTrending);
router.get('/categories', getCategoryStats);

// Admin stats
router.get('/admin/overview', authenticate, adminOnly, getOverview);

module.exports = router;
