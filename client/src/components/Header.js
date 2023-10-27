import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import left from '../assets/left.png';
import middle from '../assets/middle.png';
import right  from '../assets/right.png';
import './header.css';
import avatar from '../assets/avatar.png'

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate(); // Move the hook call inside the functional component

  return (
    <header>
      
        <div className='navbar'>
        <img src={right} className='right' alt="" />
        <img src={middle} className='middle' alt="" />
        <img src={left} className='left' alt="" />
        
          <div className="NavItem">
            <h3>Jobfinder</h3>
            
            <div className='RightNavItem'>
          {user ? (
            <div className='user-info'>
              <p className='logout' onClick={onLogout}>Logout</p>
              <p className='greeting'>Hello! {user}</p>  
              <img className='avatar' src={avatar} alt="Avatar"></img>
                    
              </div>
          ) : (
            <>
               <button onClick={() => {navigate("../login")}} className='login' >Login </button>
               <button onClick={() => {navigate("../register")}} className='signup'>Register</button>
            </>
          )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
