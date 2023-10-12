// Registration.js
import React, { useState  } from 'react';
import axios from 'axios';
import bannerImage from '../../assets/banner.jpg';
import ('./register.css');


const Registration = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Password: '',
  });

  const { Name, Email, Mobile, Password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/register', formData);
      // Assuming the backend sends a token and user name in the response on successful registration
      const { jwtToken, recruiterName } = response.data;

      // Store the token and user name in localStorage
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', recruiterName);

      // Redirect to another page (e.g., the home page)
      // You can use React Router for navigation.
    } catch (error) {
      // Handle registration error (e.g., display an error message)
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="registration-page">
    <div className="left-side">
      <h1>Create an Account</h1>
      <h3>Your Personal Job finder is here</h3>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <input
            type="text" name="Name" id="Name"
            value={Name} onChange={handleChange}
            placeholder="Name" required
          />
        </div>
        <div className="form-group">
          <input 
          type="email" name="Email" id="Email"
            value={Email} onChange={handleChange}
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
            <input
            type="checkbox"
            name="privacyPolicy"
            required
            /> I agree to the Privacy Policy
            <span className="checkmark"></span>
            </label>
        
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Sign In</a></p>
      </form>
    </div>
    <div className="right-side">
      <img
        src={bannerImage}
        alt="Banner"
        className="banner-image"
      />
    </div>
  </div>
);
};

export default Registration;
