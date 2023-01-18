import React from 'react'
import './Loader.css'

const Loader = ({ text }) => {
  return (
    <div className='loader'>

      <div>

        <svg className='loader-0' width="128" height="128" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#a261f3">
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
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

        <svg className='loader-1' xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 471.007 761.555">
          <defs>  
            <linearGradient id="logo-gradient" x1="0%" y1="50%" x2="100%" y2="50%" > 
              <stop offset="0%" stop-color="#5700FF">
                <animate attributeName="stop-color" values="#5700FF; #b451ff; #5700FF" dur="1s" repeatCount="indefinite"></animate>
              </stop>
              <stop offset="100%" stop-color="#b451ff">
                <animate attributeName="stop-color" values="#b451ff; #5700FF; #b451ff" dur="1s" repeatCount="indefinite"></animate>
              </stop>
            </linearGradient> 
          </defs>
          
          <path d="M239.87,570.173,6.1,432.217,239.728,761.555,473.613,432.217,239.728,570.173ZM243.345,0,9.674,387.834,243.345,526.028,477.111,387.976Z" transform="translate(-6.104)" fill="url('#logo-gradient')"/>
        </svg>

      </div>

      {text || "Loading.."}

    </div>
  )
}

export default Loader
