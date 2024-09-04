const Job = require('../models/Job');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.create = async (req, res) => {
  const { jobTitle, companyName, jobDescription, userId } = req.body;
  try {
    // Create new user
    job = new Job({
        jobTitle,
        companyName,
        jobDescription,
        userId
    });

    await job.save();

    // Create JWT token
   

    res.status(201).json({ msg:"Job added sucessfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllJobs = async (req, res) => {
  try {
      const jobs = await Job.find() // Exclude passwords
      res.json(jobs);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};