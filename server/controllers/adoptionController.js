// controllers/adoptionController.js
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');

// adoptionController.js
// controllers/adoptionController.js
exports.create = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      phone,
      pet: petId,
      message,
    } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });

    if (pet.status !== 'available') {
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

    // Update pet status to pending
    pet.status = 'pending';
    await pet.save();

    res.status(201).json({ msg: 'Adoption request submitted', adoption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Approve adoption
exports.approve = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption)
      return res.status(404).json({ msg: 'Adoption request not found' });

    if (adoption.status !== 'pending') {
      return res
        .status(400)
        .json({ msg: 'Only pending requests can be approved' });
    }

    adoption.status = 'approved';
    await adoption.save();

    await Pet.findByIdAndUpdate(adoption.pet, { status: 'adopted' });

    res.json({ msg: 'Adoption approved', adoption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Reject adoption
exports.reject = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption)
      return res.status(404).json({ msg: 'Adoption request not found' });

    if (adoption.status !== 'pending') {
      return res
        .status(400)
        .json({ msg: 'Only pending requests can be rejected' });
    }

    adoption.status = 'rejected';
    await adoption.save();

    await Pet.findByIdAndUpdate(adoption.pet, { status: 'available' });

    res.json({ msg: 'Adoption rejected', adoption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all adoption requests (for admin)
exports.getAll = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate({
        path: 'pet',
        select: 'name status category',
        populate: { path: 'category', select: 'name' }, // ✅ nested populate
      })
      .populate('user', 'name email')
      .sort({ createdAt: -1 }); // optional: newest first

    res.json(adoptions);
  } catch (err) {
    console.error('Error fetching adoptions:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
