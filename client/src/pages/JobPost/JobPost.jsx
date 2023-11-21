import React, { useContext, useEffect, useState } from 'react';
import BgImg from '../../assets/Wallpaperofaddjob.png';
import classes from './jobpost.module.css';
import SectionPage from '../../components/SectionPage/SectionPage';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Text/Textarea';
import Dropdown from '../../components/dropdown/Dropdown';
import ActionButton from '../../components/Actionbutton/ActionButton';
import { useNavigate, useLocation } from 'react-router-dom';


const initialJobDetails = {
  companyName: '',
  logoURL: '',
  jobTitle: '',
  salary: '',
  jobType: 'FullTime',
  remote: 'Remote',
  location: '',
  description: '',
  about: '',
  skill: '',
  information: '',
};
const initialErrors = {
  companyName: '',
  logoURL: '',
  jobTitle: '',
  salary: '',
  jobType: '',
  remote: '',
  location: '',
  description: '',
  about: '',
  skill: '',
  information: '',
};

const CreateJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobIdToUpdate = queryParams.get('id');
  console.log('jobIdToUpdate:', jobIdToUpdate);
  
  const [jobDetails, setJobDetails] = useState(initialJobDetails);
  const [errors, setErrors] = useState(initialErrors);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthorized(true);
    }
  }, [token]);

  const onChangeHandler = (fieldName, value) => {
    const updatedErrors = { ...errors };
    if (
      value.trim() === '' &&
      [
        'companyName',
        'logoURL',
        'jobTitle',
        'jobType',
        'location',
        'remote',
        'description',
        'about',
        'skill',
        'information',
      ].includes(fieldName)
    ) {
      updatedErrors[fieldName] = `Please enter a valid ${fieldName}.`;
    } else {
      updatedErrors[fieldName] = '';
    }

    if (fieldName === 'salary') {
      if (value !== '' && isNaN(value)) {
        updatedErrors[fieldName] = 'Monthly salary must be a number.';
      }
    }

    if (fieldName === 'skill') {
      const skillsArray = value.split(',').map((skill) => skill.trim());
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        skill : skillsArray,
      }));
    } else {
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        [fieldName]: value,
      }));
    }

    setErrors(updatedErrors);
  };

  const onCancelHandler = () => {
    navigate('/homepage');
  };
 
    // Fetch job details if updating an existing job
    useEffect(() => {
        if (jobIdToUpdate) {
        console.log(jobIdToUpdate);
        fetch(`${BASE_URL}/jobpost/${jobIdToUpdate}`)
          .then((res) => res.json())
          .then((data) => {
            console.log('UPDATE');
            console.log(data);
            console.log(data?.Job);
            setJobDetails({
              ...data?.Job,
              jobType: data?.Job?.jobType || 'Full Time', // Set default if not available
              remote: data?.Job?.remote || 'In-Office', // Set default if not available
            });
          })
          .catch((err) => console.log(err));
      }
    }, [jobIdToUpdate, BASE_URL]); // Add BASE_URL to the dependency array
    
   
  const onSubmitHandler = async () => {
    const updatedErrors = {
      companyName:
        jobDetails.companyName?.trim() === ''
          ? 'Please enter a valid company name.'
          : '',
      logoURL:
        jobDetails.logoURL?.trim() === ''
          ? 'Please enter a valid logo URL.'
          : '',
      jobTitle:
        jobDetails.jobTitle?.trim() === ''
          ? 'Please enter a valid job position.'
          : '',
      salary:
        jobDetails.salary === ''
          ? 'Please enter a valid monthly salary.'
          : isNaN(jobDetails.salary)
          ? 'Monthly salary must be a number.'
          : '',
      description:
        jobDetails.description?.trim() === ''
          ? 'Please enter a valid job description.'
          : '',
      location:
        jobDetails.location?.trim() === ''
          ? 'Please enter a valid location.'
          : '',
      about:
        jobDetails.about?.trim() === ''
          ? 'Please enter valid information about the company.'
          : '',
      skill:
        jobDetails.skill?.length === 0
          ? 'Please enter the required skills.'
          : '',
      information:
        jobDetails.information === ''
          ? 'Please enter additional information.'
          : '',
    };

    setErrors(updatedErrors);

    const hasErrors =
      Object.values(updatedErrors).filter((error) => error !== '').length > 0;

      if (!hasErrors) {
        console.log(JSON.stringify(jobDetails));
        try {
          const url = jobIdToUpdate
            ? `${BASE_URL}/jobpost/${jobIdToUpdate}`
            : `${BASE_URL}/jobpost`;
  
            console.log('Request URL:', url);


            const token = localStorage.getItem('token'); // Get the token from local storage or wherever it's stored

            const options = {
              method: jobIdToUpdate ? 'PUT' : 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the authorization token in the request headers
              },
              body: JSON.stringify(jobDetails),
            };
            console.log('Request Method:', options.method);
            console.log('Request Headers:', options.headers);
            console.log(jobIdToUpdate);
            console.log('Request Body:', JSON.stringify(jobDetails));
              
          const response = await fetch(url, options);
         

if (!response.ok) {
  // Handle the error
  const errorData = await response.json(); // Parse the error response
  console.error(`Error: ${response.status} - ${errorData.message}`);
  // You can also handle the error message and display it to the user
} else {
  // Process the successful response
  const data = await response.json();
  // Your success handling logic here
}

  
          if (!jobIdToUpdate) {
            setJobDetails(initialJobDetails); // Reset form after successful submission
          }
        } catch (error) {
          console.log(error);
          console.error(error);
        }
      }
    };
  

  return (
    <>
      {authorized && (
        <SectionPage bgImg={BgImg} title={'Recruiter add job details here'}>
          
          <div className={classes.JobPostForm}>
          <h2>Add job description</h2>
            <div className={classes.InputSet}>
              <label>Company Name</label>
              <div className={classes.InputTest}>
                <Input
                  type="text"
                  value={jobDetails?.companyName}
                  placeholder="Enter your company name here"
                  onChange={(e) =>
                    onChangeHandler('companyName', e.target.value)
                  }
                />
                {errors.companyName && (
                  <p className={classes.Error}>{errors.companyName}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Add logo URL</label>
              <div className={classes.InputTest}>
                <Input
                  type="text"
                  value={jobDetails?.logoURL}
                  placeholder="Enter the link"
                  onChange={(e) => onChangeHandler('logoURL', e.target.value)}
                />
                {errors.logoURL && (
                  <p className={classes.Error}>{errors.logoURL}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Job Position</label>
              <div className={classes.InputTest}>
                <Input
                  type="text"
                  value={jobDetails?.jobTitle}
                  placeholder="Enter job Position"
                  onChange={(e) =>
                    onChangeHandler('jobTitle', e.target.value)
                  }
                />
                {errors.jobTitle && (
                  <p className={classes.Error}>{errors.jobTitle}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Monthly Salary</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="number"
                  value={jobDetails?.salary}
                  placeholder="Enter amount in rupees"
                  onChange={(e) =>
                    onChangeHandler('salary', e.target.value)
                  }
                />
                {errors.salary && (
                  <p className={classes.Error}>{errors.salary}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Job Type</label>
              <div className={classes.InputTest}>
                <Dropdown
                  className={classes.Input}
                  options={['FullTime', 'PartTime']}
                  value={jobDetails?.jobType}
                  onChange={(value) => onChangeHandler('jobType', value)}
                />

                {errors.jobType && (
                  <p className={classes.Error}>{errors.jobType}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Remote/office</label>
              <div className={classes.InputTest}>
                <Dropdown
                  className={classes.Input}
                  options={['Remote','InOffice']}
                  value={jobDetails?.remote}
                  onChange={(value) => onChangeHandler('remote', value)}
                />

                {errors.remote && (
                  <p className={classes.Error}>{errors.remote}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Location</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.location}
                  placeholder="Enter location"
                  onChange={(e) => onChangeHandler('location', e.target.value)}
                />
                {errors.location && (
                  <p className={classes.Error}>{errors.location}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Job Description</label>
              <div className={classes.InputTest}>
                <Textarea
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.description}
                  placeholder="Type the job description"
                  onChange={(e) =>
                    onChangeHandler('description', e.target.value)
                  }
                />
                {errors.description && (
                  <p className={classes.Error}>{errors.description}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>About Company</label>
              <div className={classes.InputTest}>
                <Textarea
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.about}
                  placeholder="Type about your company"
                  onChange={(e) =>
                    onChangeHandler('about', e.target.value)
                  }
                />
                {errors.about && (
                  <p className={classes.Error}>{errors.about}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Skills Required</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.skill}
                  placeholder="Enter the must have skills"
                  onChange={(e) =>
                    onChangeHandler('skill', e.target.value)
                  }
                />
                {errors.skill && (
                  <p className={classes.Error}>{errors.skill}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Information</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.information}
                  placeholder="Enter the additional information"
                  onChange={(e) =>
                    onChangeHandler('information', e.target.value)
                  }
                />
                {errors.information && (
                  <p className={classes.Error}>{errors.information}</p>
                )}
              </div>
            </div>
            <div className={classes.ActionButton}>
              <ActionButton
                text="Cancel"
                bgColor="#FFF"
                textColor="#ED5353"
                onClick={onCancelHandler}
              />
              <ActionButton
                text={jobIdToUpdate ? 'Update Job' : '+ Add Job'}
                bgColor="#ED5353"
                textColor="#FFF"
                onClick={onSubmitHandler}
              />
            </div>
          </div>
        </SectionPage>
      )}
      {!authorized && <p> Please login or register to access this page !</p>}
    </>
  );
};

export default CreateJob;
