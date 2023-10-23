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
        navigate('/HomePage');
        console.log('Registered successfully');
      }
    } catch (error) {
      // Handle other registration errors
      setError('Email Alredy Exists! pls try again');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="registration-page">
      <div className="left-side">
        <h1>Create an Account</h1>
        <h3>Your Personal Job finder is here</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <input
              type="text"
              name="Name"
              id="Name"
              value={Name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="Email"
              id="Email"
              value={Email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="Mobile"
              id="Mobile"
              value={Mobile}
              onChange={handleChange}
              placeholder="Mobile"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="Password"
              id="Password"
              value={Password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <label className="privacy-policy-label">
            <br></br>
            <input type="checkbox" name="privacyPolicy" required /> I agree to the Privacy Policy
            <span className="checkmark"></span>
          </label>

          <button type="submit">Register</button>
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </form>
      </div>
      <div className="right-side">
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
    </div>
  );
};

export default Registration;
