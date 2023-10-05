
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); 
const authMiddleware = require('../middleware/authMiddleware');
const Job = require('../model/job'); // Import the Job model

dotenv.config();

// Controller for creating a job post
const createJob = async (req, res) => {
  try {
    const skillsRequired = ["Skill", "Skill 2", "Skill 3"];
    const { companyName,logoURL,
        position,salary,JobType,
        remote,location,description,
        about,skillsRequired: skillsArray, 
        recruiterName/* Add other required fields */ } = req.body;

    // Check if required fields are provided
    if ( !companyName || !logoURL ||
        !position || !salary || !JobType ||
        !remote || !location || !description ||
        !about || !skillsRequired || 
        !recruiterName/* Check other required fields */) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create a new job post
    const newJob = new Job({ companyName,logoURL,
        position,salary,JobType,
        remote,location,description,
        about,skillsRequired: skillsArray, 
        recruiterName /* Add other required fields */ });
    await newJob.save();

    res.status(201).json({ message: 'Job post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Job post creation failed' });
  }
};

// Combine route definition and controller
router.post('/jobpost', authMiddleware, createJob);


router.patch('/jobpost/:jobId', async (req, res) => {
    const jobId = req.params.jobId;
    const updatedJobData = req.body; // Data to update the job post
  
    try {
      // Find the job post by its ID
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Update the job post with the provided data
      job.set(updatedJobData);
      const updatedJob = await job.save();
  
      res.status(200).json({ message: 'Job post updated successfully', job: updatedJob });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Job post update failed' });
    }
  });


  router.get('/jobpost', async (req, res) => {
    try {
      const { skills, jobTitle } = req.query;
  
      // Define a filter object based on the query parameters
      const filter = {};
      if (skills) {
        filter.skillsRequired = { $in: skills.split(',') };
      }
      if (jobTitle) {
        filter.jobTitle = { $regex: jobTitle, $options: 'i' };
      }
  
      // Query the database with the filter
      const jobs = await Job.find(filter);
  
      res.status(200).json({ jobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error listing jobs' });
    }
  });


module.exports = router;
