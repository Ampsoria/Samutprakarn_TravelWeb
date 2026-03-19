const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const { getReviews, createReview, getAdminReviews, moderateReview, deleteReview } = require('../controllers/reviews.controller');

// Public - get approved reviews for a place
router.get('/places/:placeId/reviews', getReviews);

// User - create review (requires login)
router.post('/places/:placeId/reviews', authenticate, createReview);

// Admin - manage reviews
router.get('/admin/reviews', authenticate, adminOnly, getAdminReviews);
router.patch('/admin/reviews/:id', authenticate, adminOnly, moderateReview);
router.delete('/admin/reviews/:id', authenticate, adminOnly, deleteReview);

module.exports = router;
