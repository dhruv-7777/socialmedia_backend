const express = require('express');
const { create, getAllJobs } = require('../controllers/jobController');


const job = express.Router();
job.get('/', getAllJobs);

// Register route
job.post('/create', create);

module.exports = job;
