import React from 'react'
import './ProfileIcon.css'
import { toSvg } from 'jdenticon'

const ProfileIcon = ({ handleClick, address }) => {

  return (
    <button id='profile-icon' onClick={handleClick} dangerouslySetInnerHTML={{__html: toSvg(address, 44)}}>
      
    </button>
  )
}

export default ProfileIcon
