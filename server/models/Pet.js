const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    breed: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    imageLabel: {
      type: String,
    },
    additionalImages: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pet = mongoose.model('Pet', PetSchema);
