import React from 'react'
import Logo from './Logo'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <Logo/>
      <div className='links'>
        <a href='/'>Home</a>
        <a href='/get-started'>Get Started</a>
        <a href='/create-project'>Create Project</a>
        <a href='/profile'>Profile</a>
        <a href='/'>About</a>
      </div>
    </div>
  )
}

export default Footer
