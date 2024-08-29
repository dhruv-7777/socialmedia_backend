const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false, 
  },
  preferences: {
    type: [String], 
    required: false, 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
