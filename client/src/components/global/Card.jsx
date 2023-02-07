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

  const percentage = calculateBarPercentage(goal, amountCollected); // Calculate progress bar width in percent

  const hasReachedGoal = amountCollected >= goal; // Calculate if goal reached

  // Diplay remaining days in human readable form
  const remainingDays = () => {
    const days = daysLeft(deadline)
    if (days > 1) {
      return days + " days left"
    } else if ( days == 1 ) {
      return days + " day left"
    } else if ( days == 0 ) {
      return "<1 day left"
    } else if ( days < 0) {
      return "Time over"
    }
  }

  const truncatedOwnerString = truncateString(`${owner}`, 10); // Truncate address to take up less space

  // If a prop isn't passed over correctly, default to these values
  const defaultValues = {
    title: "Crowdfunding Project",
    address: "Address",
    percentage: 0,
    remainingDays: 0
  }

  // Stops card navigating to details page when clicking "withdraw", weird js as usual
  const handleWithdrawClick = (event) => {
    event.stopPropagation()
    handleWithdraw()
  }

  return (
    <div className='card' onClick={handleClick}>

      {/* If goal reached, show goal reached tag */}
      {
        hasReachedGoal &&
        <div className='goalReachedLabel'>
          Goal Reached!
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004ZM23 8.25a.75.75 0 0 1 .102 1.493L23 9.75h-2a.75.75 0 0 1-.102-1.493L21 8.25h2Zm-20 0a.75.75 0 0 1 .102 1.493L3 9.75H1a.75.75 0 0 1-.102-1.493L1 8.25h2Zm19.6-5.7a.75.75 0 0 1-.066.977l-.084.073-2 1.5a.75.75 0 0 1-.984-1.127l.084-.073 2-1.5a.75.75 0 0 1 1.05.15ZM2.45 2.4l2 1.5a.75.75 0 1 1-.9 1.2l-2-1.5a.75.75 0 1 1 .9-1.2Z" fill="currentColor"/></svg>
        </div>
      }

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

      { hasWithdrawButton ?
        <>
          <div style={{height: "8px"}}></div>
          <AccentButton handleClick={handleWithdrawClick}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.25 6.045V5.75A2.75 2.75 0 0 0 16.5 3H5.25a2.25 2.25 0 0 0-2.244 2.409A.757.757 0 0 0 3 5.5v12.25A3.25 3.25 0 0 0 6.25 21h12.5a2.75 2.75 0 0 0 2.75-2.75v-9.5a2.75 2.75 0 0 0-2.25-2.705ZM5.25 4.5H16.5c.69 0 1.25.56 1.25 1.25V6H5.25a.75.75 0 0 1 0-1.5Zm11 8.5h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5Z" fill="currentColor"/></svg>
            Withdraw Funds!
          </AccentButton>
        </>
        :
        <>
          {/* Details container */}
          <div className='detail-container'>
            <p className='percentage'>{percentage || defaultValues.percentage}<span>%</span></p>
            <p className='time'>{remainingDays || defaultValues.remainingDays} {remainingDays()}</p>
          </div>

          {/* Progress bar */}
          <div className='progress-container'>
            <div className='progress' style={{ width: `${percentage || defaultValues.percentage}%`, maxWidth: '100%'}}></div>
          </div>
        </>
      }

    </div>
  );
};

export default Card;
