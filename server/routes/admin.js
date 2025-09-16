const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Dashboard stats
router.get(
  '/dashboard',
  authMiddleware,
  adminMiddleware,
  adminController.getDashboard
);

// Manage users
router.get('/users', authMiddleware, adminMiddleware, adminController.getUsers);
router.put(
  '/users/:id/role',
  authMiddleware,
  adminMiddleware,
  adminController.updateUserRole
);
router.delete(
  '/users/:id',
  authMiddleware,
  adminMiddleware,
  adminController.deleteUser
);

module.exports = router;
