import React, { useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function HomePage() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    // Implement your logout logic here.
    // Clear user-related data and update the state to indicate no user is logged in.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  

  return (
    <div>
      <Header user={user} onLogout={handleLogout} navigate={navigate} /> {/* Pass navigate as a prop */}
      {/* Render other components based on your routing */}
    </div>
  );
}

export default HomePage;
