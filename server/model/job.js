const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoURL: String,
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  JobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance'],
    required: true,
  },
  remote: {
    type: Boolean,
    required: true,
  },
  location: String,
  description: {
    type: String,
    required: true,
  },
  about: String,
  skillsRequired: {
    type: [String],
    required: true,
  },
  recruiterName: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
