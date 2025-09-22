const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/forgot-password', authController.requestPasswordReset);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
