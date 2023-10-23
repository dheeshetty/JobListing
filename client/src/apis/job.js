import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const jobPost = async (jobPostdescription, headers) => {
    try {
        const reqUrl = `${backendUrl}/jobpost`;
        const reqPayload = {
            ...jobPostdescription,
        };
        
        // Add your JWT token to the headers
        const authHeaders = {
            ...headers,
            Authorization: `${localStorage.getItem('token')}`, // Retrieve the JWT token from local storage
        };

        const response = await axios.post(reqUrl, reqPayload, { headers: authHeaders });
        console.log('is done')
        return response;
    } catch (error) {
        console.log(error);
    }
}




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

