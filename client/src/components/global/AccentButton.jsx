import React from 'react';
import './AccentButton.css';

const AccentButton = ({ children, handleClick, buttonType, height }) => {


  return (
    <button id='accent-button' onClick={handleClick} type={buttonType} style={{ minHeight: height || "44px" }}>
      {children}
    </button>
  );
};

export default AccentButton;
