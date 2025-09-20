const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
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

//For stripe
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('tiny'));

app.use('/public', express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoption', adoptionRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/donations', donationRoutes);

//////////////
// ✅ Stripe donation route
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pet Donation 🐶',
            },
            unit_amount: req.body.amount * 100, // donation in cents
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/user/success-payment',
      cancel_url: 'http://localhost:3000/user/cancel-payment',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/////////////

verifyTransport();

mongoose.connect(moongoUri, {
  useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB...');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
});

app.listen(4000, () => {
  console.log('App is running on PORT 4000');
});
