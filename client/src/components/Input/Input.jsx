import React from 'react';
import classes from './input.module.css';

const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <div>
      <input
        className={classes.Input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
