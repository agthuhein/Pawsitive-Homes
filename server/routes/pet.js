const express = require('express');
const petController = require('../controllers/petController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

//uuid

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    if (!fs.existsSync('public/images')) {
      fs.mkdirSync('public/images');
    }
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg') {
      return cb(new Error('Only videos are allowed!'));
    }
    cb(null, true);
  },
});

//image - single file
//additionalImages - multiple - 5 limit

router.post(
  '/create',
  upload.fields([
    {
      name: 'image',
      maxCount: 1,
    },
    {
      name: 'additionalImages',
      maxCount: 5,
    },
  ]),
  petController.create
);

// Get all pets
router.get('/all', petController.getAll);

// Get pets by id
router.get('/get/:id', petController.getById);

//update pets
router.put(
  '/update/:id',
  upload.fields([
    {
      name: 'image',
      maxCount: 1,
    },
    {
      name: 'additionalImages',
      maxCount: 5,
    },
  ]),
  petController.update
);

// Delete pet by id
router.delete('/delete/:id', petController.delete);

module.exports = router;
