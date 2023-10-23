import React, { useState } from 'react';
import { jobPost } from '../../apis/job'; // Import your API request function

export default function JobPost() {
  const [jobPostDescription, setJobPostDescription] = useState({
    companyName: '',
    logoURL: '',
    jobTitle: '',
    salary: '', // Should match the expected data type on the server
    JobType: 'Full-Time',
    remote: false,
    location: '',
    description: '',
    about: '',
    skillsRequired: [], // Use a more advanced input method for skills
    recruiterName: '',
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setJobPostDescription({
      ...jobPostDescription,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const validationError = {};

    if (!jobPostDescription.companyName) {
      validationError.companyName = 'Company name is required';
    }

    // Add more validation checks for other fields as needed

    return validationError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (Object.keys(validationError).length === 0) {
        const headers = {}; // Set your headers here if needed
        const response = await jobPost(jobPostDescription, headers);
        if (response) {
            alert('Job posted successfully');
            setJobPostDescription({ ...jobPostDescription, skillsRequired: [] });
        }
    } else {
        setError(validationError);
    }
  };

  
  return (
    <div>
      <h2>Create a Job Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Your job post form fields here */}
                <input
          type="text"
          name="companyName"
          value={jobPostDescription.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />

        <input
          type="text"
          name="logoURL"
          value={jobPostDescription.logoURL}
          onChange={handleChange}
          placeholder="Logo URL"
        />

        <input
          type="text"
          name="jobTitle"
          value={jobPostDescription.jobTitle}
          onChange={handleChange}
          placeholder="Position"
          required
        />

        <input
          type="number" 
          name="salary"
          value={jobPostDescription.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />

        <select
          name="JobType" 
          value={jobPostDescription.JobType} 
          onChange={handleChange}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>

        <input
          type="checkbox"
          name="remote"
          checked={jobPostDescription.remote}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          value={jobPostDescription.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <textarea
          name="description"
          value={jobPostDescription.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <textarea
          name="about"
          value={jobPostDescription.about}
          onChange={handleChange}
          placeholder="About"
        />

        {/* Use a more advanced input method for skillsRequired */}
        {/* For example, a select, chips, or tags input */}
        <input
          type="text"
          name="skillsRequired"
          value={jobPostDescription.skillsRequired}
          onChange={handleChange}
          placeholder="Skills Required"
          required
        />

        <input
          type="text"
          name="recruiterName"
          value={jobPostDescription.recruiterName}
          onChange={handleChange}
          placeholder="Recruiter Name"
          required
        />

        <button type="submit">Create Job Post</button>
      </form>
    </div>
  );
};

