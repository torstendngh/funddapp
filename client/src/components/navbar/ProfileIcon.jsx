// Modules
import React from 'react';
import { toSvg } from 'jdenticon';

// CSS
import './ProfileIcon.css';

const ProfileIcon = ({ handleClick, address }) => {
  return (
    <button id='profile-icon' onClick={handleClick} dangerouslySetInnerHTML={{__html: toSvg(address, 44)}}></button>
  );
};

export default ProfileIcon;
