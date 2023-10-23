import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './header.css';
import avatar from '../assets/avatar.png'

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate(); // Move the hook call inside the functional component

  return (
    <header>
      <div className='header'>
        <Container>
          <div className="title">Jobfinder</div>
          {user ? (
            <div className="user-info">
              <p className='logout' onClick={onLogout}>Logout</p>
              <p className='greeting'>Hello! {user}</p>  
              <img className='avatar' src={avatar} alt="Avatar"></img>       
            </div>
          ) : (
            <div className="login-register">
               <button onClick={() => {navigate("../login")}} className='login' >Login </button>
               <button onClick={() => {navigate("../register")}} className='signup'>Register</button>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
};

export default Header;
