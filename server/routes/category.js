const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Get all categories
router.get('/all', categoryController.getAll);

// Create new category
router.post('/create', categoryController.create);

// Update a category
router.put('/update/:id', categoryController.update);

// Delete a category
router.delete('/delete/:id', categoryController.delete);

module.exports = router;
