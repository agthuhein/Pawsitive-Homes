const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authMiddleware } = require('../middleware/auth');

// Create PayPal order (requires login so we can use req.user.email)
router.post(
  '/paypal/create-order',
  authMiddleware,
  donationController.createPaypalOrder
);

// Capture PayPal order, then save + send email
router.post(
  '/paypal/capture-order',
  authMiddleware,
  donationController.capturePaypalOrder
);

// View my donations
router.get('/me', authMiddleware, donationController.getMine);

module.exports = router;
