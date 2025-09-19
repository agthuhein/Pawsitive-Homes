// controllers/adoptionController.js
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const { sendMail } = require('../utils/mailer');

// CREATE (POST /api/adoption/:petId/request)
exports.create = async (req, res) => {
  try {
    const { firstName, lastName, email, address, phone, message } = req.body;
    const { petId } = req.params;

    const petDoc = await Pet.findById(petId);
    if (!petDoc) return res.status(404).json({ error: 'Pet not found' });

    if (petDoc.status !== 'available') {
      return res
        .status(400)
        .json({ error: 'Pet is not available for adoption' });
    }

    const adoption = await Adoption.create({
      firstName,
      lastName,
      email,
      address,
      phone,
      message,
      pet: petId,
      user: req.user?.id,
      status: 'pending',
    });

    petDoc.status = 'pending';
    await petDoc.save();

    sendMail({
      to: email,
      subject: 'We received your adoption request 🐾',
      html: `<p>Hi ${firstName},</p>
             <p>Thanks for requesting to adopt <strong>${petDoc.name}</strong>. We’ll review and update you soon.</p>`,
    }).catch((err) => console.error('Mail error (create):', err.message));

    res.status(201).json({ msg: 'Adoption request submitted', adoption });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error → index violation
      return res
        .status(400)
        .json({ error: 'You have already requested this pet.' });
    }
    console.error('Adoption create error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// APPROVE
exports.approve = async (req, res) => {
  try {
    const adoption = await Adoption.findOneAndUpdate(
      { _id: req.params.id, status: 'pending' }, // only pending
      { status: 'approved' },
      { new: true }
    ).populate('pet', 'name');

    if (!adoption)
      return res
        .status(404)
        .json({ msg: 'Adoption request not found or not pending' });

    await Pet.findByIdAndUpdate(adoption.pet._id || adoption.pet, {
      status: 'adopted',
    });

    sendMail({
      to: adoption.email,
      subject: 'Your adoption request was approved 🎉',
      html: `<p>Congratulations! Your request for <strong>${
        adoption.pet?.name || 'the pet'
      }</strong> was approved.</p>`,
    }).catch((err) => console.error('Mail error (approve):', err.message));

    res.json({ msg: 'Adoption approved', adoption });
  } catch (err) {
    console.error('Approve error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.reject = async (req, res) => {
  try {
    const adoption = await Adoption.findOneAndUpdate(
      { _id: req.params.id, status: 'pending' }, // only pending
      { status: 'rejected' },
      { new: true }
    ).populate('pet', 'name');

    if (!adoption)
      return res
        .status(404)
        .json({ msg: 'Adoption request not found or not pending' });

    await Pet.findByIdAndUpdate(adoption.pet._id || adoption.pet, {
      status: 'available',
    });

    sendMail({
      to: adoption.email,
      subject: 'Update on your adoption request',
      html: `<p>We’re sorry — your request for <strong>${
        adoption.pet?.name || 'the pet'
      }</strong> was not approved this time.</p>`,
    }).catch((err) => console.error('Mail error (reject):', err.message));

    res.json({ msg: 'Adoption rejected', adoption });
  } catch (err) {
    console.error('Reject error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get all adoption requests (for admin)
exports.getAll = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate({
        path: 'pet',
        select: 'name status category',
        populate: { path: 'category', select: 'name' },
      })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(adoptions);
  } catch (err) {
    console.error('Error fetching adoptions:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get logged-in user's adoption requests
exports.getMine = async (req, res) => {
  try {
    const mine = await Adoption.find({ user: req.user.id })
      .populate({
        path: 'pet',
        select: 'name status category image',
        populate: { path: 'category', select: 'name' },
      })
      .sort({ createdAt: -1 });

    res.json(mine);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Cancel user's adoption request
exports.cancelMine = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) return res.status(404).json({ msg: 'Request not found' });
    if (String(adoption.user) !== req.user.id) {
      return res.status(403).json({ msg: 'Not your request' });
    }
    if (adoption.status !== 'pending') {
      return res
        .status(400)
        .json({ msg: 'Only pending requests can be canceled' });
    }

    adoption.status = 'canceled';
    await adoption.save();

    // If this was the only pending request, revert pet to available
    const otherPending = await Adoption.countDocuments({
      pet: adoption.pet,
      _id: { $ne: adoption._id },
      status: 'pending',
    });

    if (otherPending === 0) {
      await Pet.findByIdAndUpdate(adoption.pet, { status: 'available' });
    }

    // ✅ Send cancellation email
    await sendMail({
      to: adoption.email,
      subject: 'Your adoption request was canceled',
      html: `<p>Hi ${adoption.firstName},</p>
             <p>Your adoption request has been canceled successfully.</p>`,
    });

    res.json({ msg: 'Request canceled', adoption });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Server error' });
  }
};
