import React from 'react';
import classes from './section.module.css';

const AuthPage = ({ children, bgImg, title }) => {
  return (
    <div className={classes.AuthPage}>
      <div className={classes.LeftSection}>{children}</div>
      <div className={classes.RightSection}>
        <img src={bgImg} alt="" />
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default AuthPage;
