const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update User
exports.update = async (req, res) => {
  const { firstName, lastName, email, password, profileImage, preferences } = req.body;
  
  try {
    let user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    console.log(req.body);

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.password = password || user.password;
      user.profileImage = profileImage || user.profileImage;
      user.preferences = preferences || user.preferences;

      await user.save();

      res.json({ msg: 'User updated successfully' });

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find().select('-password'); // Exclude passwords
      res.json(users);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};