const express = require('express');
const { addConnection, getConnections } = require('../controllers/connectionController');

const connection = express.Router();
connection.get('/', getConnections);
// console.log("Suresh");

// Register route
connection.post('/create', addConnection);

module.exports = connection;
