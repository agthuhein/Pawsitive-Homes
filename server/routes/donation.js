const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authMiddleware } = require('../middleware/auth');

// public endpoint to record donation (guest user allowed), but we’ll accept token if present
router.post('/', donationController.create);

// user's donations (requires login)
router.get('/me', authMiddleware, donationController.getMine);

module.exports = router;
