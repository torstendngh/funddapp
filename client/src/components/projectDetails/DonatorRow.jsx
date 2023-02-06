// Modules
import React from 'react';
import { toSvg } from '../../utils/jdenticon';

// CSS
import './DonatorRow.css';

/**
 * @typedef Props
 * @prop {string} user
 * @prop {number} amount
 */

/**
 * Donator row component for the "ProjectDetails" page
 * @param {Props} props
 */
const DonatorRow = ({user, amount}) => {
  return (
    <div className='donator-row'>
      <div className='user'>
        <div className='profile-picture' dangerouslySetInnerHTML={{__html: toSvg(user, 24)}}></div>
        {user}
      </div>
      <p className='amount'>{amount} ETH</p>
    </div>
  );
};

export default DonatorRow;
