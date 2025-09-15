const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const categoryRoutes = require('./routes/category');

const app = express();

app.use(cors());

app.use(express.json());

//routes
app.use('/api/category', categoryRoutes);

const moongoUri = 'mongodb://localhost:27017/Pawsitive-Home';

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
