const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    address: String,
    phone: String,
    message: String,

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
      enum: ['pending', 'approved', 'rejected', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// ✅ Prevent same user requesting the same pet more than once
AdoptionSchema.index({ pet: 1, user: 1 }, { unique: true });

// ✅ Prevent multiple pending requests on the same pet
AdoptionSchema.index(
  { pet: 1 },
  { unique: true, partialFilterExpression: { status: 'pending' } }
);

module.exports = mongoose.model('Adoption', AdoptionSchema);
