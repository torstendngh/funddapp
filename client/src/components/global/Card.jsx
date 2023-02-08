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
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.78 6.78a.75.75 0 0 0-.53-1.28H18.5V2.75a.75.75 0 0 0-1.28-.53l-2.5 2.5a.75.75 0 0 0-.22.53v2.836l-1.982 1.982a2 2 0 1 0 1.414 1.414L15.914 9.5h2.836a.75.75 0 0 0 .53-.22l2.5-2.5ZM12 2a9.98 9.98 0 0 1 3.424.601l-1.412 1.412c-.062.062-.12.13-.171.2a8 8 0 1 0 5.947 5.947c.07-.052.137-.11.2-.173l1.41-1.41A9.982 9.982 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 4c.518 0 1.02.066 1.5.189v1.482l-.414.415a2.032 2.032 0 0 0-.049.05A4.005 4.005 0 0 0 8 12a4 4 0 1 0 7.864-1.037l.05-.049.414-.414h1.483A6 6 0 1 1 12 6Z" fill="currentColor"/></svg>
        </div>
      }

      {/* Project image */}
      <div className='image-container'>
        {/* Not sure why 'alt' needs such a weird conversion, but doesn't throw error like this */}
        {image && <img src={image} alt={`${title || defaultValues.title}`}/>}
      </div>

      {/* Project title */}
      <p className='title'>{title || defaultValues.title}</p>

      {/* Project owner profile picture and owner address */}
      <div className='owner'>
        <div className='profile-picture' dangerouslySetInnerHTML={{__html: toSvg(owner, 20)}}></div>
        {truncatedOwnerString || defaultValues.address}
      </div>

      {/* Project amounts */}
      <p className='details'>{amountCollected} / {goal} ETH</p>

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
