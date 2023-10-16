import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleJobPostClick = () => {
    // Navigate to the "Job Post" page
    navigate('/jobpost');
  };

  return (
    <header>
      <div className="logo">Your Logo</div>
      {user ? (
        <div className="user-info">
          <p>Hello, {user}</p>
          <button onClick={onLogout}>Logout</button>
          <button onClick={handleJobPostClick}>Job Post</button>
        </div>
      ) : (
        <div className="login-register">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      )}
    </header>
  );
};

export default Header;
