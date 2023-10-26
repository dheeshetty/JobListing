import React, { useEffect, useState } from 'react';
import classes from './details.module.css';
import Header from '../../components/Header';
import Money from '../../assets/money.png';
import calender from '../../assets/calender.png';
import ActionButton from '../../components/Actionbutton/ActionButton';
import { useNavigate, useParams } from 'react-router';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState('');
  const [job, setJob] = useState({});
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [authorized, setAuthorized] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [token]);

  
  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/job/${id}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            // Handle "Job not found" case
            console.error('Job not found.');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.data) {
          setJob(data.data);

          const createdAtDate = new Date(data.data.createdAt);
          const dateNow = new Date();
          const durationInMilliseconds = dateNow - createdAtDate;
          const millisecondsPerDay = 24 * 60 * 60 * 1000;
          const durationInDays = Math.floor(durationInMilliseconds / millisecondsPerDay);
          console.log('durationInDays:', durationInDays);

          const newToken = localStorage.getItem('token');
          setAuthorized(!!newToken);

          setDuration(getDurationText(durationInDays));
        } else {
          console.error('Job data not found or is empty.');
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [id]);

  const getDurationText = (durationInDays) => {
    if (durationInDays === 0) {
      return 'Today';
    } else if (durationInDays < 7) {
      return `${durationInDays} days ago`;
    } else {
      const durationInWeeks = Math.round(durationInDays / 7);
      return `${durationInWeeks} weeks ago`;
    }
  };

  const handleEditJob = (jobId) => {
    navigate(`/jobpost?id=${jobId}`);
  };

  const handleLogout = () => {
    // Clear user-related data and update the state to indicate no user is logged in.
    localStorage.removeItem('token'); // Remove the user's token
    localStorage.removeItem('user'); // Remove any user-related data
    setUser(''); // Set the user state to null or an initial state
  };



  return (
    <div className={classes.DetailsPage}>
     <Header user={user} onLogout={handleLogout} />

      <div className={classes.Details}>
        <div className={classes.JobOverview}>
          <h3>
            {job?.jobTitle} {job?.jobType} job at {job?.companyName}
          </h3>
        </div>
        <div className={classes.JobDetails}>
          <div className={classes.JobHead}>
            <span>{duration}</span>
            <span className={classes.Decorator}>.</span>
            <span>{job?.jobType}</span>
            <img className={classes.Logo} src={job?.logoURL} alt="" />
            <span>
              {job?.companyName}{' '}
              <div className={classes.ActionButton}>
                {authorized && (
                  <ActionButton
                    text="Edit Job"
                    bgColor="#ED5353"
                    textColor="#fff"
                    onClick={() => handleEditJob(job?._id)}
                  />
                )}
              </div>
            </span>
          </div>
          <h2>{job?.jobTitle} </h2>
          <span>{job?.location} | India</span>
          <div className={classes.JobInfo}>
            <div>
              <span>
                <img src={Money} alt="" />
                Salary
              </span>
              <h3>Rs {job?.salary}/month</h3>
            </div>
            <div>
              <span>
                <img src={calender} alt="" />
                Job Type
              </span>
              <h3> {job?.jobType}</h3>
            </div>
          </div>

          <h4 className={classes.Heading}>About Company</h4>
          <p className={classes.Paragraph}>{job?.about}</p>
          <h4 className={classes.Heading}>About the job/internship</h4>
          <p className={classes.Paragraph}>{job?.description}</p>
          <h4>Skill(s) Required</h4>
          <div className={classes.Skill}>
            {job?.skill?.map((skill) => (
              <span className={classes.SkillTag} key={skill}>
                {skill}
              </span>
            ))}
          </div>
          <h4 className={classes.Heading}>Additional Information</h4>
          <p className={classes.Paragraph}>{job?.information}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
