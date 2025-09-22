const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, address, password } = req.body;
    const userId = req.user.id; // from authMiddleware

    const updateData = { firstName, lastName, phone, address };

    // If user wants to change password
    if (password && password.length >= 8) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get current logged-in user profile
exports.getMe = async (req, res) => {
  try {
    console.log('🔎 req.user:', req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('❌ getMe error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update profile
exports.updateMe = async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone, address },
      { new: true }
    ).select('-password');

    res.json({ msg: 'Profile updated', user });
  } catch (err) {
    console.error('updateMe error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Current password is incorrect' });

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ msg: 'Password must be at least 8 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // ✅ Only update password field
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
