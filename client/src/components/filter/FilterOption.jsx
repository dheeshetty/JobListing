import React from 'react';
import classes from './filter.module.css';

const FilterOption = ({ value, onClick }) => {
  return (
    <div className={classes.FilterOption}>
      <p>{value}</p>
      <span onClick={onClick}>X</span>
    </div>
  );
};

export default FilterOption;
