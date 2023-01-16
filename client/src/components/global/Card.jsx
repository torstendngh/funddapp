import React from 'react';
import './Card.css';

const Card = ({ title, owner, target, amountCollected, deadline, image, handleClick }) => {
  return (
    <div className='card'>
      <div className='image-container'>

      </div>
      <p className='title'>Title</p>
      <p className='owner'>Username</p>
      <div className='detail-container'>
        <p className='percentage'>0%</p>
        <p className='time'>0:00:00</p>
      </div>
      <div className='progress-container'>
        <div className='progress'></div>
      </div>
    </div>
  );
};

export default Card;
