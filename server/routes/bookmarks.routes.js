const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getBookmarks, addBookmark, removeBookmark, checkBookmark } = require('../controllers/bookmarks.controller');

router.get('/', authenticate, getBookmarks);
router.post('/', authenticate, addBookmark);
router.get('/check/:placeId', authenticate, checkBookmark);
router.delete('/:placeId', authenticate, removeBookmark);

module.exports = router;
