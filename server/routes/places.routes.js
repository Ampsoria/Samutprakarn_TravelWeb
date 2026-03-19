const express = require('express');
const router = express.Router();
const { getPlaces, getPlace, createPlace, updatePlace, deletePlace } = require('../controllers/places.controller');

// Public
router.get('/', getPlaces);
router.get('/:slug', getPlace);

// Place management (no auth required)
router.post('/', createPlace);
router.put('/:id', updatePlace);
router.delete('/:id', deletePlace);

module.exports = router;
