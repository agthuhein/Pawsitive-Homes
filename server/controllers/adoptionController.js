// controllers/adoptionController.js
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');

// adoptionController.js
exports.create = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      phone,
      pet: petId,
      user,
    } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    if (pet.status === 'adopted')
      return res.status(400).json({ error: 'Already adopted' });

    // Prevent duplicate request by same user for same pet
    const existing = await Adoption.findOne({
      user,
      pet: petId,
      status: 'pending',
    });
    if (existing) {
      return res
        .status(400)
        .json({ error: 'You already requested adoption for this pet' });
    }

    const adoption = await Adoption.create({
      firstName,
      lastName,
      email,
      address,
      phone,
      pet: petId,
      user, // 👈 take from body (Postman test)
      status: 'pending',
    });

    if (pet.status === 'available') {
      pet.status = 'pending';
      await pet.save();
    }

    res.status(201).json({ msg: 'Adoption request submitted', adoption });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Approve adoption
exports.approve = async (req, res) => {
  try {
    const { id } = req.params; // adoption request id
    const adoption = await Adoption.findById(id).populate('pet');
    if (!adoption) return res.status(404).json({ error: 'Adoption not found' });

    const pet = adoption.pet;
    if (!pet) return res.status(404).json({ error: 'Pet not found' });

    // Ensure pet not already adopted
    if (pet.status === 'adopted') {
      return res.status(400).json({ error: 'Pet already adopted' });
    }

    // Approve this adoption
    adoption.status = 'approved';
    await adoption.save();

    // Reject all other pending requests for this pet
    await Adoption.updateMany(
      { pet: pet._id, _id: { $ne: adoption._id }, status: 'pending' },
      { $set: { status: 'rejected' } }
    );

    // Update pet status
    pet.status = 'adopted';
    await pet.save();

    res.json({ msg: 'Adoption approved', adoption });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Reject adoption
exports.reject = async (req, res) => {
  try {
    const { id } = req.params;
    const adoption = await Adoption.findById(id).populate('pet');
    if (!adoption) return res.status(404).json({ error: 'Adoption not found' });

    const pet = adoption.pet;
    if (!pet) return res.status(404).json({ error: 'Pet not found' });

    adoption.status = 'rejected';
    await adoption.save();

    // If ALL requests for this pet are rejected, set pet back to available
    const pendingOrApproved = await Adoption.findOne({
      pet: pet._id,
      status: { $in: ['pending', 'approved'] },
    });

    if (!pendingOrApproved) {
      pet.status = 'available';
      await pet.save();
    }

    res.json({ msg: 'Adoption rejected', adoption });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Get all adoption requests (for admin)
exports.getAll = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate('pet', 'name status')
      .populate('user', 'name email');
    res.json(adoptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
