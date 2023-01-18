import React from 'react'
import './Logo.css'
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <button to="/" id='logo' onClick={() => {
      navigate('/')
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <path id="Path_13" data-name="Path 13" d="M5.25,2A3.25,3.25,0,0,0,2,5.25v8A3.25,3.25,0,0,0,5.25,16.5H7.5v2.25A3.25,3.25,0,0,0,10.75,22h8A3.25,3.25,0,0,0,22,18.75v-8A3.25,3.25,0,0,0,18.75,7.5H16.5V5.25A3.25,3.25,0,0,0,13.25,2ZM16.5,7.5v5.75a3.25,3.25,0,0,1-3.25,3.25H7.5V10.75A3.25,3.25,0,0,1,10.75,7.5Z" transform="translate(-2 -2)" fill="currentColor"/>
      </svg>
      <p className='text'>
        Chain<span>Funding</span>
      </p>
    </button>
  )
}

export default Logo
