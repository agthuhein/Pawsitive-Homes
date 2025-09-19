const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    }, // null if guest
    email: { type: String, required: true },
    amount: { type: Number, required: true }, // in USD
    currency: { type: String, default: 'USD' },
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
