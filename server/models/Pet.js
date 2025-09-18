const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
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
    traits: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    status: {
      type: String,
      enum: ['available', 'adopted', 'pending'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pet = mongoose.model('Pet', PetSchema);
