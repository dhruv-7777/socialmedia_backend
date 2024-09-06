const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId,  },
    reciever: { type: mongoose.Schema.Types.ObjectId,  },
    status: { type: String, enum: ['accepted', 'pending'], default: 'pending' }
});

module.exports = mongoose.model('Connection', ConnectionSchema);
