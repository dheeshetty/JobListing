import React, { useEffect, useState } from 'react';
import classes from './homepage.module.css';
import SearchIcon from '../../assets/SearchIcon.png';
import FilterOption from '../../components/filter/FilterOption';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Dropdown from '../../components/dropdown/Dropdown';
import ActionButton from '../../components/Actionbutton/ActionButton';
import SkillTag from '../../components/skill/skilltag';
import EmployeeLogo from '../../assets/Employee.png';
import CurrencyLogo from '../../assets/currency.png';
import FlagLogo from '../../assets/flag.png';
import { fetchJobs } from '../../apis/job';

const Homepage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const { id } = useParams();
  const [skill, setSkill] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Define an array of available skills
  const skillsArray = [
    'Skills',
    'React' ,
    'NodeJS' ,
    'MongoDB' ,
    'C++' ,
    'C' ,
    'Python' ,
    'html' ,
    'CSS' ,
    'JavaScript' ,
  ];

  const [selectedSkill, setSelectedSkill] = useState('');

  useEffect(() => {
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [token]);

  useEffect(() => {
  // Fetch jobs based on skills and jobTitle
  const skillQuery = skill.length > 0 ? `skill=${skill.join(',')}` : '';
  const searchQuery = [skillQuery, jobTitle ? `jobTitle=${jobTitle}` : ''].filter(Boolean).join('&');

  fetchJobs(searchQuery)
    .then((data) => {
      // Assuming that the response contains a property called 'jobs' with an array of job data
      const fetchedJobs = data.jobs; // Adjust this based on your API response structure
      setJobs(fetchedJobs);
    })
    .catch((error) => console.error(error));
}, [skill, jobTitle]);

  

  const onClickHandler = () => {
    navigate('/jobpost');
  };

  const handleEditJob = (jobId) => {
    navigate(`/jobpost?id=${jobId}`);
  };

  const handleSelectChange = (selectedValue) => {
    console.log('Selected Skill:', selectedValue);
    if (selectedValue && !skill.includes(selectedValue)) {
      setSkill((prevSkill) => [...prevSkill, selectedValue ]);
      console.log('Updated Skill State:', skill);
    }
  }
  

  const handleRemoveSkill = (skill) => {
    setSkill((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const clearSkills = () => {
    setSkill([]);
  };

  const handleLogout = () => {
    // Clear user-related data and update the state to indicate no user is logged in.
    localStorage.removeItem('token'); // Remove the user's token
    localStorage.removeItem('user'); // Remove any user-related data
    setUser(''); // Set the user state to null or an initial state
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleSearch = (searchValue) => {
    setJobTitle(searchValue);
  };

  const onSearchSubmit = (searchValue) => {
    handleSearch(searchValue);
  };
  

  return (
    <>
      <Header user={user} onLogout={handleLogout} /> {/* Pass user and onLogout as props to the Header component */}
      <div className={classes.JobListing}>
        <div className={classes.FilterDiv}>
          <div className={classes.SearchBar}>
            <img src={SearchIcon} alt="" />
            <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onSearchSubmit(jobTitle);
                  }
             }}/>
          </div>
          <div className={classes.FilterDisplay}>
            <div className={classes.LeftDisplay}>
              <Dropdown
                filter="filter"
                options={skillsArray}
                onChange={(selectedValue) => handleSelectChange(selectedValue)} 
              />
              <div className={classes.FilterOptionContainer}>
                {skill.length > 0 &&
                  skill.map((skill) => (
                    <FilterOption
                      key={skill}
                      value={skill}
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  ))}
                {skill.length > 0 && (
                  <button
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#ed5353',
                      position: 'absolute',
                      bottom: '0',
                      right: '-370px',
                      fontSize: '1.2em',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                    onClick={clearSkills}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            {
              <div
                className={classes.RightDisplay}
                style={{ position: 'absolute', right: '120px' }}
              >
                {authorized && (
                  <ActionButton
                    text="Add Job"
                    textColor="#FFF"
                    bgColor="#ff6b6b"
                    fontSize="1.3em"
                    onClick={onClickHandler}
                  />
                )}
              </div>
            }
          </div>
        </div>

        {jobs.length > 0 &&
          jobs.map((job) => (
            <div className={classes.Job} key={job._id}>
              <img src={job.logoURL} alt={job.companyName} />
              <div className={classes.JobMetadata}>
                <div className={classes.LeftSection}>
                  <h3>{job.jobTitle}</h3>
                  <div className={classes.Metadata2}>
                    <div className={classes.DataDiv}>
                      <img src={EmployeeLogo} alt="" />
                      <span>11-50</span>
                    </div>
                    <div className={classes.DataDiv}>
                      <img src={CurrencyLogo} alt="" />
                      <span>{job.salary}</span>
                    </div>
                    <div className={classes.DataDiv}>
                      <img src={FlagLogo} alt="" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className={classes.Metadata3}>
                    <span>{job.remoteOrOffice}</span>
                    <span>{job.jobType}</span>
                  </div>
                </div>
                <div className={classes.RightSection}>
                  <div className={classes.Skills}>
                    {job.skill.map((skill) => (
                      <SkillTag key={skill} title={skill} />
                    ))}
                  </div>
                  <div className={classes.ActionButton}>
                    {authorized && (
                      <ActionButton
                        text="Edit job"
                        bgColor="#FFF"
                        textColor="#ED5353"
                        onClick={() => handleEditJob(job._id)}
                      />
                    )}
                    <ActionButton
                      text=" View details"
                      bgColor="#ED5353"
                      textColor="#FFF"
                      onClick={() => navigate(`/details/${job._id}`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Homepage;
