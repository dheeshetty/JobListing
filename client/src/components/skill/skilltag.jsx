import React from 'react';
import classes from './skilltag.module.css';
const SkillTag = ({ title }) => {
  return (
    <div>
      <p className={classes.Tag}>{title}</p>
    </div>
  );
};

export default SkillTag;
