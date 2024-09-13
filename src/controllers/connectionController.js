const Connection = require('../models/Connection');
const User = require('../models/User');

// Create a new connection
exports.addConnection = async (req, res) => {
  const { sender, reciever } = req.body;
  try {
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

// Get all the connection
exports.getConnections = async (req, res) => {
  try {
    const { userId } = req.body;
    const connections = await Connection.find({ sender: userId })
    const receiverIds = connections.map(connection => connection.reciever);
    const users = await User.find({ _id: { $in: receiverIds } })
      .select('_id firstName lastName');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// accept the Request
exports.acceptConnection = async (req, res) => {
  const { requestId } = req.body;
  try {
    let conenection = await Connection.findById(req.requestId);
    if (!conenection) {
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
    res.json({ msg: 'Request has been accepted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Remove Coneection 
exports.rejectConnection = async (req, res) => {
  const { requestId } = req.body;
  try {
    let conenection = await Connection.findById(req.requestId);
    if (!conenection) {
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
    res.json({ msg: 'Request has been accepted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getRequsteduser = async (req, res) => {
  try {
    const { userIds } = req.body; 

    // Find users whose IDs are in the userIds array
    const users = await User.find({ _id: { $in: userIds } })
      .select('_id firstName lastName'); // Exclude passwords

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};