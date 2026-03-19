const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');
const { getProfile, updateProfile, getUsers, updateUser, deleteUser } = require('../controllers/users.controller');

// User profile
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

// Admin user management
router.get('/admin/users', authenticate, adminOnly, getUsers);
router.patch('/admin/users/:id', authenticate, adminOnly, updateUser);
router.delete('/admin/users/:id', authenticate, adminOnly, deleteUser);

module.exports = router;
