import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


// Function to create a new job
export const createJob = async (jobDetails, headers) => {
  
  try{
    const url = `${backendUrl}/jobpost`;
    const options = {
      method: 'POST', ...jobDetails
    };
      const authHeaders = {
        ...headers,
        Authorization: `${localStorage.getItem('token')}`, // Retrieve the JWT token from local storage
    };
  
    const response = await axios.post(url, options, { headers: authHeaders });
          console.log('is done')
          return response;
     
    } catch (error) {
      console.log(error);
    }
  };

// Function to update a job
export const updateJob = async (jobId, jobDetails, headers) => {
  try{
  const url = `${backendUrl}/jobpost/${jobId}`;
  const options = {
    method: 'PUT', ...jobDetails
  };
    const authHeaders = {
      ...headers,
      Authorization: `${localStorage.getItem('token')}`, // Retrieve the JWT token from local storage
  };

  const response = await axios.post(url, options, { headers: authHeaders });
        console.log('is done')
        return response;
   
  } catch (error) {
    console.log(error);
  }
};

// Function to fetch job details by ID
export const fetchJobById = async (jobId) => {
  const url = `${backendUrl}/jobpost/${jobId}`;
  const response = await fetch(url);
  return response.json();
};





// APIs/job.js
export const fetchJobs = async (searchQuery) => {
  try {
    const response = await fetch(`${backendUrl}/get-job?${searchQuery}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Handle the response data and return it
    const data = await response.json();

    return data; // Return the data
  } catch (error) {
    throw new Error(`API call failed: ${error.message}`);
  }
};

