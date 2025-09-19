// routes/adoption.js
const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Create adoption request
//router.post('/', authMiddleware, adoptionController.create);
// adoption.js
router.post('/:petId/request', authMiddleware, adoptionController.create);

// User adoption requests
router.get('/me', authMiddleware, adoptionController.getMine);
router.put('/:id/cancel', authMiddleware, adoptionController.cancelMine);

// Admin adoption management
router.get('/', authMiddleware, adminMiddleware, adoptionController.getAll);
router.put(
  '/:id/approve',
  authMiddleware,
  adminMiddleware,
  adoptionController.approve
);
router.put(
  '/:id/reject',
  authMiddleware,
  adminMiddleware,
  adoptionController.reject
);

module.exports = router;
