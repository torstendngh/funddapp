// Modules
import React from 'react';

// CSS
import './TextField.css';

/**
 * @typedef Props
 * @prop {string} label
 * @prop {string} placeholder
 * @prop {*} inputType
 * @prop {boolean} isTextArea - true: textarea element for longer text; false: input element for one line of text
 * @prop {number} value
 * @prop {function} handleChange
 * @prop {*} icon - Should be an SVG element
 * @prop {boolean} [required] - defaults to true
 * @prop {number} [min]
 */

/**
 * Text box component with label and icon
 * @param {Props} props
 */
const TextField = ({ label, placeholder, inputType, isTextArea, value, handleChange, icon, required, min }) => {
  return (
    <div className='text-field'>

      {/* Label */}
      <p className='label'>{label}</p>

      <div className='box'>

        {/* Icon */}
        <div className='icon'>
          {icon}
        </div>

        {/* Input */}
        {isTextArea ? (
          <textarea
            rows={4} 
            type={inputType} 
            placeholder={placeholder} 
            value={value} 
            onChange={handleChange} 
            required={required || true}
            min={min}
          />
        ) : (
          <input 
            step="0.001" 
            type={inputType} 
            placeholder={placeholder} 
            value={value} 
            onChange={handleChange} 
            required={required || true}
            min={min}
          />
        )}
        
      </div>
    </div>
  );
};

export default TextField;
