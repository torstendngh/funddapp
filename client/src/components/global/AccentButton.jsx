// Modules
import React from 'react';

// CSS
import './AccentButton.css';

/**
 * @typedef Props
 * @prop {*} children
 * @prop {function} handleClick
 * @prop {*} [buttonType]
 * @prop {number} [height]
 * @prop {number} [width]
 */

/**
 * Main button component
 * @param {Props} props
 */
const AccentButton = ({ children, handleClick = undefined, buttonType, height, width }) => {
  return (
    <button className='accent-button' onClick={handleClick} type={buttonType} style={{ minHeight: height || "44px", minWidth: width || "44px" }}>
      {children}
    </button>
  );
};

export default AccentButton;
