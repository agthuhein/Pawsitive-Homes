// models/Adoption.js
const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },

    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Prevent same user making multiple *pending* requests for same pet
AdoptionSchema.index({ pet: 1, user: 1, status: 1 }, { unique: true });

module.exports = mongoose.model('Adoption', AdoptionSchema);
