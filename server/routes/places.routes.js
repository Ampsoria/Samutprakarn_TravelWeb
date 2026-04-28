const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const { getPlaces, getPlace, createPlace, updatePlace, deletePlace } = require('../controllers/places.controller');

// Public
router.get('/', getPlaces);
router.get('/:slug', getPlace);

// Admin only
router.post('/', authenticate, adminOnly, createPlace);
router.put('/:id', authenticate, adminOnly, updatePlace);
router.delete('/:id', authenticate, adminOnly, deletePlace);

module.exports = router;
