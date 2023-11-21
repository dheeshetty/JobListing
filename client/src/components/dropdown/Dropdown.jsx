import React, { useState } from 'react';
import DropdownArrow from '../../assets/Dropdown.png';
import classes from './dropdown.module.css';

const Dropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0]);
  console.log(selected);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setSelected(option);
    onChange(option);
  };

  return (
    <div className={classes.Dropdown}>
      <button className={classes.DropdownButton} onClick={toggleDropdown} text='Skills'>
        {selected} <img src={DropdownArrow} alt="" />{' '}
      </button>

      {isOpen && (
        <ul className={classes.DropdownOption}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
