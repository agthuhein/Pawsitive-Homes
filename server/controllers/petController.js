const Pet = require('../models/Pet');
const fs = require('fs');
const path = require('path');

exports.create = async (req, res) => {
  try {
    console.log(req.files);

    const { name, age, breed, color, description, imageLabel, category } =
      req.body;

    const { image, additionalImages } = req.files;

    let imagePath = '';

    let additionalImagesPath = [];

    if (image && image.length > 0) {
      imagePath = image[0].path;
    }
    if (additionalImages && additionalImages.length > 0) {
      additionalImagesPath = additionalImages.map((file) => file.path);
    }

    const createdPet = await Pet.create({
      name,
      age,
      breed,
      color,
      description,
      imageLabel,
      category,
      image: imagePath,
      additionalImages: additionalImagesPath,
    });

    res.json({ msg: 'Pet created successfully', createdPet });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const allPets = await Pet.find();

    res.json(allPets);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);

    res.json(pet);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//////// Pet update
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, breed, color, description, imageLabel, category } =
      req.body;

    const { image, additionalImages } = req.files;

    let imagePath = '';

    let additionalImagesPath = [];

    if (image && image.length > 0) {
      imagePath = image[0].path;
    }
    if (additionalImages && additionalImages.length > 0) {
      additionalImagesPath = additionalImages.map((file) => file.path);
    }

    const existingPet = await Pet.findById(id);
    if (additionalImagesPath.length === 0) {
      additionalImagesPath = existingPet.additionalImages;
    } else {
      Promise.all(
        existingPet.additionalImages.map(
          async (img) =>
            await fs.unlink(path.join(__dirname, '../', img), (err, res) => {
              if (err) {
                console.log(err);
              } else {
                console.log('Files deleted successfully');
              }
            })
        )
      )
        .then(console.log)
        .catch(console.log);
    }
    if (imagePath.length === 0) {
      imagePath = existingPet.image;
    } else {
      await fs.unlink(
        path.join(__dirname, '../', existingPet.image),
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            return;
          }
        }
      );
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
        image: imagePath,
        additionalImages: additionalImagesPath,
      },
      {
        new: true,
      }
    );

    res.json({ msg: 'Pet updated successfully', updatedPet });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

/// Delete pet
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPet = await Pet.findById(id);

    if (!existingPet) {
      return res.status(404).json({ msg: 'Pet does not exist' });
    }

    const deletedPet = await Pet.findByIdAndDelete(id);

    res.json({ msg: 'Pet removed successfully', deletedPet });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
