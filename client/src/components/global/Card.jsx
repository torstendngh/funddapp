// Modules
import React from 'react';
import { daysLeft, calculateBarPercentage, truncateString } from '../../utils';
import { toSvg } from '../../utils/jdenticon';
import AccentButton from './AccentButton';

// CSS
import './Card.css';

/**
 * @typedef Props
 * @prop {string} title
 * @prop {string} owner
 * @prop {number} goal
 * @prop {number} amountCollected
 * @prop {date} deadline
 * @prop {string} image - Image URL
 * @prop {function} handleClick
 */

/**
 * Project card component
 * @param {Props} props
 */
const Card = ({ title, owner, goal, amountCollected, deadline, image, handleClick, hasWithdrawButton = false, handleWithdraw }) => {

  const remainingDays = daysLeft(deadline);
  const percentage = calculateBarPercentage(goal, amountCollected);

  // Truncate address to take up less space
  const truncatedOwnerString = truncateString(`${owner}`, 10);

  // If a prop isn't passed over correctly, default to these values
  const defaultValues = {
    title: "Crowdfunding Project",
    address: "Address",
    percentage: 0,
    remainingDays: 0
  }

  const handleWithdrawClick = (event) => {
    event.stopPropagation()
    handleWithdraw()
  }

  return (
    <div className='card' onClick={handleClick}>

      {/* Project image */}
      <div className='image-container'>
        {image && <img src={image} alt={title || defaultValues.title} />}
      </div>

      {/* Project title */}
      <p className='title'>{title || defaultValues.title}</p>

      {/* Project owner profile picture and owner address */}
      <div className='owner'>
        <div className='profile-picture' dangerouslySetInnerHTML={{__html: toSvg(owner, 20)}}></div>
        {truncatedOwnerString || defaultValues.address}
      </div>

      {/* Details container */}
      <div className='detail-container'>
        <p className='percentage'>{percentage || defaultValues.percentage}<span>%</span></p>
        <p className='time'>{remainingDays || defaultValues.remainingDays} {remainingDays == 1 ? "day left" : "days left"}</p>
      </div>

      {/* Progress bar */}
      <div className='progress-container'>
        <div className='progress' style={{ width: `${percentage || defaultValues.percentage}%`, maxWidth: '100%'}}></div>
      </div>

      {
        hasWithdrawButton &&
        <AccentButton handleClick={handleWithdrawClick}>
          Withdraw Funds!
        </AccentButton>
      }

    </div>
  );
};

export default Card;
