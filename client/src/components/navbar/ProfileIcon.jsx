// Modules
import React from 'react';
import { toSvg } from '../../utils/jdenticon';

// CSS
import './ProfileIcon.css';

/**
 * @typedef Props
 * @prop {function} handleClick
 * @prop {string} address
 */

/**
 * Profile icon component in navbar
 * @param {Props} props
 */
const ProfileIcon = ({ handleClick, address }) => {
  return (
    <button id='profile-icon' onClick={handleClick} dangerouslySetInnerHTML={{__html: toSvg(address, 44)}}></button>
  );
};

export default ProfileIcon;
