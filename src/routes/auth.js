const express = require('express');
const { register, login, update } = require('../controllers/authController');
const authUpdate = require('../middleware/authUpdate');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Update User
router.put('/update',authUpdate, update);

module.exports = router;
