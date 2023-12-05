
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../../assets/banner.jpg';
import './register.css';
import { registerUser } from '../../apis/auth';

const Registration = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Password: '',
  });

  const [error, setError] = useState(''); // Error message state

  const { Name, Email, Mobile, Password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);

      if (response.error) {
        setError(response.error); // Assuming the API returns an "error" field in the response
      } else {
        // Registration was successful
        const { jwtToken, recruiterName } = response;
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', recruiterName);
        navigate('/');
        console.log('Registered successfully');
      }
    } catch (error) {
      // Handle other registration errors
      setError('Email Alredy Exists! pls try again');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="leftDiv">
        <form className="userDetailsDiv" style={{ padding: "0px" }} onSubmit={handleSubmit}>
          <div className="userDetailsDiv">
            <h1>Create an Account</h1>
            <p>Your Personal Job Finder is Here</p>

            <input
              minLength={5}
              required
              type="text"
              value={Name}
              onChange={handleChange}
              name="Name"
              placeholder="Name"
            />
            <input
              type="email"
              name="Email"
              id="Email"
              value={Email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
             <input
              type="tel"
              name="Mobile"
              id="Mobile"
              value={Mobile}
              onChange={handleChange}
              placeholder="Mobile"
              required
            />
            
            <input
              type="password"
              name="Password"
              id="Password"
              value={Password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          {error && <p className="error-message">{error}</p>}
            <div className="termConditionDiv">
              <input
                onChange={handleChange}
                required
                type="checkbox"
                name="privacyPolicy"
                value="I agree to the Privacy Policy"
              />
              <p>By creating an account, I agree to our terms of use and privacy policy</p>
            </div>

            <div className="createAccountDiv">
              <button type="submit">Create Account</button>
              <p>Already have an account? <a href="/login">Sign In</a></p>
            </div>
          </div>
        </form>
      </div>

      <div className="rightDiv">
      
        <img src={bannerImage} alt="Banner" className="banner" style={{height: "800px" ,width: "89vh"}}/>
        <p>Your Personal Job Finder</p>
      </div>
    </div>
  );
};


export default Registration;
