const Connection = require('../models/Connection');


// Create a new connection (add following/followers)
exports.addConnection = async (req, res) => {
  const { sender, reciever } = req.body;

  try {
    // Create a new connection
    const connection = new Connection({
        sender, 
        reciever
    });

    await connection.save();

    res.status(201).json({ msg: "Connection added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all connection requests
exports.getConnections = async (req, res) => {
  try {
    const connections = await Connection.find()
      .populate('following.userId', 'firstName lastName profileImage')  // Adjust to show related user data
      .populate('followers.userId', 'firstName lastName profileImage');

    res.json(connections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
