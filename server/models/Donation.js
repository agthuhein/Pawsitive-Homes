// models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'EUR' },
    paypalOrderId: { type: String, required: true },
    status: {
      type: String,
      enum: ['completed', 'failed'],
      default: 'completed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', DonationSchema);
