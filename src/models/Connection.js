const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    following: { type: mongoose.Schema.Types.ObjectId,  },
    followers: { type: mongoose.Schema.Types.ObjectId,  },
    status: { type: String, enum: ['accepted', 'pending'], default: 'pending' }
});

module.exports = mongoose.model('Connection', ConnectionSchema);
