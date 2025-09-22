const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

//User self taking profile
router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, userController.updateProfile);

// Admin manage users
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.put(
  '/:id/promote',
  authMiddleware,
  adminMiddleware,
  userController.promoteToAdmin
);
router.put(
  '/:id/demote',
  authMiddleware,
  adminMiddleware,
  userController.demoteToUser
);
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

router.put('/change-password', authMiddleware, userController.changePassword);

module.exports = router;
