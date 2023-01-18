import React from 'react';
import './Card.css';
import { daysLeft, calculateBarPercentage } from '../../utils';
import { useNavigate } from 'react-router-dom';

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const Card = ({ title, owner, target, amountCollected, deadline, image, handleClick }) => {

  const remainingDays = daysLeft(deadline);
  const percentage = calculateBarPercentage(target, amountCollected)

  const truncatedOwnerString = truncateString(`${owner}`, 10)

  return (
    <div className='card' onClick={handleClick}>
      <div className='image-container'>
        {image && <img src={image} alt="" />}
        
      </div>
      <p className='title'>{title || "Crowdfunding Project"}</p>
      <p className='owner'>{truncatedOwnerString || "username"}</p>
      <div className='detail-container'>
        <p className='percentage'>{percentage}<span>%</span></p>
        <p className='time'>{remainingDays} days left</p>
      </div>
      <div className='progress-container'>
        <div className='progress' style={{ width: `${percentage}%`, maxWidth: '100%'}}></div>
      </div>
    </div>
  );
};

export default Card;
