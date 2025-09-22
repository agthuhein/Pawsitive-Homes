const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // include role in token
    'your_jwt_secret_key', // ⚠️ move this to process.env.JWT_SECRET in production
    { expiresIn: '1d' }
  );
};

// Register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, password, role } =
      req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      password: hashedPassword,
      role: role || 'user',
    });

    const token = generateToken(user);

    res.status(201).json({
      msg: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken(user);

    res.json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Logout (client should just delete token, but we can respond)
exports.logout = async (req, res) => {
  res.json({ msg: 'User logged out successfully (delete token on client)' });
};
