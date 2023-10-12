// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import bannerImage from '../../assets/banner.jpg';
import ('./login.css');



const Login = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const { Email, Password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', formData);
      // Assuming the backend sends a token and user name in the response on successful login
      const { jwtToken, recruiterName } = response.data;

      // Store the token and user name in localStorage
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', recruiterName);

      // Redirect to another page (e.g., the home page)
      // You can use React Router for navigation.
      console.log('Login success');
    } catch (error) {
      // Handle login error (e.g., display an error message)
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page">
    <div className="left-side">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
            type="password"
            name="Password"
            id="Password"
            value={Password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Sign Up</a></p>
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

export default Login;
