const User = require('../models/User');
const Pet = require('../models/Pet');
const Adoption = require('../models/Adoption');

// ✅ GET /api/admin/dashboard
// Return summary statistics
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPets = await Pet.countDocuments();
    const totalAdoptions = await Adoption.countDocuments();

    res.json({
      totalUsers,
      totalPets,
      totalAdoptions,
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ GET /api/admin/users
// Return all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ PUT /api/admin/users/:id/role
// Change user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ msg: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User role updated', user: updatedUser });
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ DELETE /api/admin/users/:id
// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted', user: deletedUser });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
