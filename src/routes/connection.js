const express = require('express');
const { addConnection, getConnections, acceptConnection, rejectConnection } = require('../controllers/connectionController');

const connection = express.Router();
connection.get('/', getConnections);

// Register route
connection.post('/create', addConnection);

// Accept Request route
connection.post('/accept', acceptConnection);

// Remove Request route
connection.post('/reject', rejectConnection);

module.exports = connection;
