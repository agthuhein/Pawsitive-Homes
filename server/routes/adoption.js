const express = require('express');
const adoptionController = require('../controllers/adoptionController');

const router = express.Router();

// Create adoption
router.post('/create', adoptionController.create);

// Get all adoption
router.get('/all', adoptionController.getAll);

// Get adoption by Id
router.get('/get/:id', adoptionController.getById);

// Update adoption
router.put('/update/:id', adoptionController.update);

// Delete adoption
router.delete('/delete/:id', adoptionController.delete);

module.exports = router;
