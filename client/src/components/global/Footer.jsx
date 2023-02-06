// Modules
import React from 'react';

// Components
import Logo from './Logo';

// CSS
import './Footer.css';

/**
 * General page footer
 */
const Footer = () => {
  return (
    <div className='footer'>

      {/* Logo links to homepage */}
      <Logo/>

      {/* Links to pages */}
      <div className='links'>
        <a href='/'>Home</a>
        <a href='/get-started'>Get Started</a>
        <a href='/create-project'>Create Project</a>
        <a href='/search'>Search</a>
        <a href='/profile'>Profile</a>
        <a href='/'>About</a>
      </div>
      
    </div>
  );
};

export default Footer;
