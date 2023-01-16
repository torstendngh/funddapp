import React from 'react'
import Logo from './Logo'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <Logo/>
      <div className='links'>
        <a>Home</a>
        <a>Get Started</a>
        <a>Create Project</a>
        <a>About</a>
      </div>
    </div>
  )
}

export default Footer
