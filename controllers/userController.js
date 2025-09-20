const User = require('../models/User');

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Promote to admin
exports.promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.json({ msg: 'User promoted to admin', user });
  } catch (err) {
    console.error('Error promoting user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Demote to user
exports.demoteToUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Prevent last admin from demoting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ msg: 'Admins cannot demote themselves' });
    }

    user.role = 'user';
    await user.save();

    res.json({ msg: 'User demoted to regular user', user });
  } catch (err) {
    console.error('Error demoting user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete user (admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user.id) {
      return res
        .status(400)
        .json({ msg: 'Admins cannot delete their own account' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Check last login rule (2 years)
    const TWO_YEARS = 1000 * 60 * 60 * 24 * 365 * 2;
    if (
      user.lastLogin &&
      Date.now() - new Date(user.lastLogin).getTime() < TWO_YEARS
    ) {
      return res.status(400).json({
        msg: 'User has logged in within the last 2 years. Cannot delete.',
      });
    }

    await user.deleteOne();

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
