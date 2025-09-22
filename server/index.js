const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const categoryRoutes = require('./routes/category');
const petRoutes = require('./routes/pet');
const adoptionRoutes = require('./routes/adoption');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const donationRoutes = require('./routes/donation');
const moongoUri = 'mongodb://localhost:27017/Pawsitive-Home';

const { verifyTransport } = require('./utils/mailer');
const { authMiddleware } = require('./middleware/auth');
const donationController = require('./controllers/donationController');

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Normal JSON parser after webhook
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoption', adoptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donations', donationRoutes);

verifyTransport();

mongoose.connect(moongoUri);

mongoose.connection.on('connected', () =>
  console.log('✅ Connected to MongoDB...')
);
mongoose.connection.on('error', (err) =>
  console.log('❌ Error connecting to MongoDB:', err)
);

app.listen(4000, () => {
  console.log('🚀 App is running on PORT 4000');
});
