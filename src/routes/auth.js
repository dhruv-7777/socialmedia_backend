const express = require('express');
const { register, login, update, getAllUsers } = require('../controllers/authController');
const authUpdate = require('../middleware/authUpdate');

const router = express.Router();
router.get('/', getAllUsers);

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Update User
router.put('/update',authUpdate, update);

module.exports = router;
