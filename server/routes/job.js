//job.js 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); 
const authMiddleware = require('../middleware/authMiddleware');
const Job = require('../model/job'); // Import the Job model


dotenv.config();

//  creating a job post
router.post('/jobpost', authMiddleware, async (req, res) => {
  try {
    
    const { companyName,logoURL,
        jobTitle,salary,jobType,
        remote,location,description,
        about,skill, 
        information } = req.body;

    // Check if required fields are provided
    if ( !companyName || !logoURL ||
        !jobTitle||!skill ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // If jobType is "remote", set location to empty string
    const updatedlocation = location === '' ? 'Remote' : location;

    const updatedLogoURL = req.body.logoURL
      ? req.body.logoURL
      : 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250';


    // Create a new job post
    const newJob = new Job({ companyName,logoURL: updatedLogoURL,
        jobTitle,salary,jobType,
        remote ,location: updatedlocation,description,
        about,skill, 
        information /* Add other required fields */ });
    await newJob.save();

    res.status(201).json({ message: 'Job post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Job post creation failed' });
  }
});

router.put('/jobpost/:jobId',authMiddleware, async (req, res) => {
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

  router.get('/get-job', async (req, res) => {
    try {
      const { skill, jobTitle } = req.query;
  
      // Define a filter object based on the query parameters
      const filter = {};
      if (skill) {
        filter.skill = { $in: skill.split(',') };
        filter.skill = { $regex: new RegExp(skill.trim(), 'i') };
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
  
  

  router.get('/job/:id', async(req,res) =>{
    try{ const {id :jobId} = req.params;
          const job = await Job.findById(jobId);
          if (!job) {
            return res.status(404).json({ message: 'Job not found' });
          }
          res.json({ data: job});

    }catch(error){
      console.error(error);
      res.status(500).json({message: 'Error while fetching the job details'})
    }
  })


module.exports = router;
