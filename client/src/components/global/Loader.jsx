// Modules
import React from 'react';

// CSS
import './Loader.css';

/**
 * @typedef Props
 * @prop {string} [text] - Text to be displayed underneath loader
 */

/**
 * Loader component
 * @param {Props} props
 */
const Loader = ({ text }) => {
  return (
    <div className='loader'>

      {/* Loader */}
      <div>

        {/* Spinner */}
        <svg className='loader-0' width="128" height="128" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#a261f3">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle stroke='#26262C' cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>

        {/* Logo flipping in 3D */}
        <svg className='loader-1' xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="linear-gradient" x1="1" x2="0.001" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#5700FF">
                <animate attributeName="stop-color" values="#5700FF; #b451ff; #5700FF" dur="1s" repeatCount="indefinite"></animate>
              </stop>
              <stop offset="100%" stopColor="#b451ff">
                <animate attributeName="stop-color" values="#b451ff; #5700FF; #b451ff" dur="1s" repeatCount="indefinite"></animate>
              </stop>
            </linearGradient>
          </defs>
          <path id="Path_28" data-name="Path 28" d="M1000,363.636C1000,162.94,837.06,0,636.364,0H363.636C162.94,0,0,162.94,0,363.636V636.364C0,837.06,162.94,1000,363.636,1000H636.364C837.06,1000,1000,837.06,1000,636.364Z" fillRule="evenodd" fill="url(#linear-gradient)"/>
          <g id="Path_13" transform="translate(126.8 126.8)">
            <path id="Path_29" data-name="Path 29" d="M163.275,62.2C107.824,62.2,62.2,107.824,62.2,163.275v248.8c0,55.451,45.624,101.075,101.075,101.075H233.25v69.975c0,55.451,45.624,101.075,101.075,101.075h248.8c55.451,0,101.075-45.624,101.075-101.075v-248.8c0-55.451-45.624-101.075-101.075-101.075H513.15V163.275c0-55.451-45.624-101.075-101.075-101.075ZM513.15,233.25V412.075c0,55.451-45.624,101.075-101.075,101.075H233.25V334.325c0-55.451,45.624-101.075,101.075-101.075Z" fill="#fff"/>
          </g>
        </svg>

      </div>

      {/* Optional text underneath loader */}
      {!!text && text}
    </div>
  );
};

export default Loader;
