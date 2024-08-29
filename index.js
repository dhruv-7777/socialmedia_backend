require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/models/User');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/', (req,res) => {
        console.log('User')
        const users =  User.find().select('-password'); // Exclude passwords
        res.json(users);
   

})
app.use('/api/auth', require('./src/routes/auth'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
