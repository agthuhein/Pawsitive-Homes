const express = require('express');
const petController = require('../controllers/petController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

//uuid

const router = express.Router();

// Ensure directories exist at startup
const uploadDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      return cb(new Error('Only images are allowed!'));
    }
    cb(null, true);
  },
});

//
//
// Public routes
// Get all pets
router.get('/', petController.getAll);

// Get pets by id
router.get('/:id', petController.getById);

//
//
// Admin-only routes
//image - single file
//additionalImages - multiple - 5 limit
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.fields([
    {
      name: 'image',
      maxCount: 1,
    },
    {
      name: 'additionalImages',
      maxCount: 2,
    },
  ]),
  petController.create
);

//update pets
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  upload.fields([
    {
      name: 'image',
      maxCount: 1,
    },
    {
      name: 'additionalImages',
      maxCount: 2,
    },
  ]),
  petController.update
);

// Delete pet by id
router.delete(
  '/delete/:id',
  authMiddleware,
  adminMiddleware,
  petController.delete
);

module.exports = router;
