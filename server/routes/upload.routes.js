const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// POST /api/upload — upload a single image (no auth required)
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'ไม่พบไฟล์รูปภาพ / No image file provided' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'อัปโหลดสำเร็จ / Upload successful',
    imageUrl,
    filename: req.file.filename,
    size: req.file.size,
  });
});

// Error handler for multer errors
router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'ไฟล์ใหญ่เกินไป (สูงสุด 5MB) / File too large (max 5MB)' });
  }
  if (err.message) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

module.exports = router;
