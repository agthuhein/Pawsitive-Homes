const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Create
router.post('/', authMiddleware, adoptionController.create);

// Get adoptions requests (admin)
router.get('/', authMiddleware, adminMiddleware, adoptionController.getAll);

// Approve (admin)
router.put(
  '/:id/approve',
  authMiddleware,
  adminMiddleware,
  adoptionController.approve
);

// Reject (admin)
router.put(
  '/:id/reject',
  authMiddleware,
  adminMiddleware,
  adoptionController.reject
);

module.exports = router;
