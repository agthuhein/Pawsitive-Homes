const Pet = require('../models/Pet');
const fs = require('fs').promises;
const path = require('path');

// Helper: delete a file safely
const deleteFile = async (filePath) => {
  if (!filePath) return; // nothing to delete

  try {
    const absolutePath = path.join(__dirname, '../', filePath);
    await fs.unlink(absolutePath);
    console.log('Deleted file:', absolutePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found, skipping delete:', filePath);
    } else {
      console.error('Error deleting file:', err);
    }
  }
};

// CREATE PET (Admin only)
exports.create = async (req, res) => {
  try {
    const {
      name,
      age,
      breed,
      color,
      description,
      imageLabel,
      category,
      status,
      traits,
      gender,
    } = req.body;

    const { image, additionalImages } = req.files;

    let imagePath = '';
    let additionalImagesPath = [];

    if (image && image.length > 0) {
      //imagePath = image[0].path;
      imagePath = `/public/images/${image[0].filename}`;
    }
    /*if (additionalImages && additionalImages.length > 0) {
      additionalImagesPath = additionalImages.map((file) => file.path);
    }*/
    if (additionalImages && additionalImages.length > 0) {
      additionalImagesPath = additionalImages.map(
        (file) => `/public/images/${file.filename}` // ✅ public path
      );
    }

    const createdPet = await Pet.create({
      name,
      age,
      breed,
      color,
      description,
      imageLabel,
      category,
      status,
      gender,
      traits: traits ? traits.split(',').map((t) => t.trim()) : [],
      image: imagePath,
      additionalImages: additionalImagesPath,
    });

    res.json({ msg: 'Pet created successfully', createdPet });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// GET ALL PETS (Public)
exports.getAll = async (req, res) => {
  try {
    const pets = await Pet.find().populate('category', 'name');
    res.json(pets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET PET BY ID (Public)
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id).populate('category');

    if (!pet) return res.status(404).json({ msg: 'Pet not found' });

    res.json(pet);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE PET (Admin only)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      breed,
      color,
      description,
      imageLabel,
      category,
      status,
      traits,
    } = req.body;

    const { image, additionalImages } = req.files;

    let imagePath = '';
    let additionalImagesPath = [];

    if (image && image.length > 0) {
      //imagePath = image[0].path;
      imagePath = `/public/images/${image[0].filename}`;
    }
    if (additionalImages && additionalImages.length > 0) {
      //additionalImagesPath = additionalImages.map((file) => file.path);
      additionalImagesPath = additionalImages.map(
        (file) => `/public/images/${file.filename}`
      );
    }

    const existingPet = await Pet.findById(id);
    if (!existingPet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    // Handle image replacement
    if (imagePath && existingPet.image) {
      await deleteFile(existingPet.image);
    } else {
      imagePath = existingPet.image;
    }

    // Handle additional images replacement
    if (additionalImagesPath.length > 0) {
      for (const oldImg of existingPet.additionalImages) {
        await deleteFile(oldImg);
      }
    } else {
      additionalImagesPath = existingPet.additionalImages;
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      {
        name,
        age,
        breed,
        color,
        description,
        imageLabel,
        category,
        status,
        traits: traits ? JSON.parse(traits) : existingPet.traits,
        image: imagePath,
        additionalImages: additionalImagesPath,
      },
      { new: true }
    );

    res.json({ msg: 'Pet updated successfully', updatedPet });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE PET (Admin only)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPet = await Pet.findById(id);
    if (!existingPet) {
      return res.status(404).json({ msg: 'Pet does not exist' });
    }

    // 🚨 Prevent deleting if status is pending
    if (existingPet.status === 'pending') {
      return res
        .status(400)
        .json({ msg: 'Cannot delete pet with pending adoption request' });
    }

    // Delete files
    if (existingPet.image) await deleteFile(existingPet.image);
    for (const img of existingPet.additionalImages) {
      await deleteFile(img);
    }

    // ✅ Delete the pet
    const deletedPet = await Pet.findByIdAndDelete(id);

    // ✅ Cascade delete adoption requests for this pet
    const Adoption = require('../models/Adoption');
    await Adoption.deleteMany({ pet: id });

    res.json({
      msg: 'Pet removed successfully (and related adoption requests cleared)',
      deletedPet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
