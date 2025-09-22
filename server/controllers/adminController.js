const User = require('../models/User');
const Pet = require('../models/Pet');
const Adoption = require('../models/Adoption');
const Donation = require('../models/Donation');

/*
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
*/
// Adoption stats by month
exports.getAdoptionTrends = async (req, res) => {
  try {
    const trends = await Adoption.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            status: '$status',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { year: '$_id.year', month: '$_id.month' },
          statuses: {
            $push: { status: '$_id.status', count: '$count' },
          },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Format for chart
    const formatted = trends.map((t) => {
      const month = `${t._id.month}-${t._id.year}`;
      const data = { month };
      t.statuses.forEach((s) => {
        data[s.status] = s.count;
      });
      return data;
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalAdoptions = await Adoption.countDocuments();
    const pendingRequests = await Adoption.countDocuments({
      status: 'pending',
    });
    const approvedRequests = await Adoption.countDocuments({
      status: 'approved',
    });
    const rejectedRequests = await Adoption.countDocuments({
      status: 'rejected',
    });

    res.json({
      totalPets,
      totalUsers,
      totalAdoptions,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all users
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
exports.getDashboardStats = async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalAdoptions = await Adoption.countDocuments();
    const pendingRequests = await Adoption.countDocuments({
      status: 'pending',
    });
    const approvedRequests = await Adoption.countDocuments({
      status: 'approved',
    });
    const rejectedRequests = await Adoption.countDocuments({
      status: 'rejected',
    });
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      totalPets,
      totalUsers,
      totalAdoptions,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      totalDonations: totalDonations[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
