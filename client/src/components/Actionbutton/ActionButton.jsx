import React from 'react';
import classes from './actionbtn.module.css';
const ActionButton = ({ text, bgColor, fontSize, textColor, onClick }) => {
  return (
    <span
      className={classes.ActionButton}
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        fontSize: fontSize,
        color: textColor,
        border: `2px solid ${textColor}`,
      }}
    >
      {text}
    </span>
  );
};

export default ActionButton;
