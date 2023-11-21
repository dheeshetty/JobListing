import React, { useState } from 'react';
import bannerImage from '../../assets/banner.jpg';
import './login.css'; // You may need to create a corresponding CSS file for your component.
import { loginUser } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const [error, setError] = useState(''); // Error message state

  const { Email, Password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      // Assuming the backend sends a token and user name in the response on successful login
      const { jwtToken, recruiterName } = response;

      // Store the token and user name in localStorage
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', recruiterName);

      
      navigate('/HomePage');
      // You can use React Router for navigation.
      console.log('Login success');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password. Please try again');
      } else {
            setError('An error occurred. Please try again later.');
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
    <div className="leftDiv" style={{ alignItems: "center" }}>
      <form onSubmit={handleSubmit} className="userDetails" style={{ padding: "0px" }}>
      <div className="userDetails">
      <h1>Already have an account?</h1>
      <p>Your Personal Job Finder is Here</p>
          
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
              type="password"
              name="Password"
              id="Password"
              value={Password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          {error && <p className="error-message">{error}</p>}

          <div className="createAccountDiv">
          <button type="submit" className="login-button">Login</button> {/* Add a 'login-button' class */}
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
          </div>
          </div>
        </form>
      </div>
      <div className="rightDiv">
    <img src={bannerImage} alt="Banner" className="banner-image" style={{height: "800px" ,width: "89vh"}}/>
    <p>Your Personal Job Finder</p>
      </div>
    </div>
    
  );
};

export default Login;
