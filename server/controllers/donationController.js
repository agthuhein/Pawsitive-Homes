const Donation = require('../models/Donation');
const { sendMail } = require('../utils/mailer');

exports.create = async (req, res) => {
  try {
    const { email, amount, paypalOrderId, status } = req.body; // from client after PayPal capture
    if (!email || !amount || !paypalOrderId) {
      return res.status(400).json({ msg: 'Missing fields' });
    }

    const donation = await Donation.create({
      user: req.user?.id || null,
      email,
      amount,
      paypalOrderId,
      status: status || 'completed',
    });

    await sendMail({
      to: email,
      subject: 'Thank you for your donation 💛',
      html: `<p>We received your donation of <strong>$${amount.toFixed(
        2
      )}</strong>. Thank you!</p>`,
    });

    res.status(201).json({ msg: 'Donation recorded', donation });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Server error' });
  }
};

// list my donations
exports.getMine = async (req, res) => {
  try {
    const list = await Donation.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(list);
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
};
