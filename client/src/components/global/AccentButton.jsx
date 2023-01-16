import React from 'react';
import './AccentButton.css';

const AccentButton = ({ children, handleClick, buttonType }) => {
  return (
    <button id='accent-button' onClick={handleClick} type={buttonType}>
      {children}
    </button>
  );
};

export default AccentButton;
