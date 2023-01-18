import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';
import './ProjectDetails.css'

import Loader from '../components/global/Loader';
import AccentButton from '../components/global/AccentButton';

const DonatorRow = ({user, amount}) => {
  return (
    <div className='donator-row'>
      <p className='user'>{user}</p>
      <p className='amount'>{amount} ETH</p>
    </div>
  )
}

const ProjectDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  const percentage = calculateBarPercentage(state.target, state.amountCollected)

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount); 

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div className='project-details'>
      <div className='section-0'>
        <div className='image-container'>
          <img src={state.image} alt="" />
        </div>
        <div className='info-container'>
          <p className='title'>{state.title}</p>
          <p className='username'>{state.owner}</p>
          <p className='description'>{state.description}</p>
        </div>
      </div>
      <div className='section-1'>
        <div>
          <p className='title'>Completed</p>
          <p className='value'>{percentage}%</p>
        </div>
        <div>
          <p className='title'>Goal</p>
          <p className='value'>{state.target} ETH</p>
        </div>
        <div>
          <p className='title'>Collected</p>
          <p className='value'>{state.amountCollected} ETH</p>
        </div>
        <div>
          <p className='title'>Days left</p>
          <p className='value'>{remainingDays}</p>
        </div>
      </div>

      <div className='progress-container'>
        <div className='progress' style={{ width: `${percentage}%`, maxWidth: '100%'}}></div>
      </div>

      <div className='section-2'>
        <p>ETH:</p>
        <input value={amount} step="0.001" placeholder='0.001' type="number" onChange={(e) => setAmount(e.target.value)} />
        <AccentButton
          buttonType="button"
          handleClick={handleDonate}
          height="64px"
          width="400px"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM9 11a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" fill="#fff"/><path d="M2 7.25A2.25 2.25 0 0 1 4.25 5h12.5A2.25 2.25 0 0 1 19 7.25v7.5A2.25 2.25 0 0 1 16.75 17H4.25A2.25 2.25 0 0 1 2 14.75v-7.5Zm2.25-.75a.75.75 0 0 0-.75.75V8h.75A.75.75 0 0 0 5 7.25V6.5h-.75Zm-.75 6h.75a2.25 2.25 0 0 1 2.25 2.25v.75h8v-.75a2.25 2.25 0 0 1 2.25-2.25h.75v-3h-.75a2.25 2.25 0 0 1-2.25-2.25V6.5h-8v.75A2.25 2.25 0 0 1 4.25 9.5H3.5v3Zm14-4.5v-.75a.75.75 0 0 0-.75-.75H16v.75c0 .414.336.75.75.75h.75Zm0 6h-.75a.75.75 0 0 0-.75.75v.75h.75a.75.75 0 0 0 .75-.75V14Zm-14 .75c0 .414.336.75.75.75H5v-.75a.75.75 0 0 0-.75-.75H3.5v.75Z" fill="#fff"/><path d="M4.401 18.5A2.999 2.999 0 0 0 7 20h10.25A4.75 4.75 0 0 0 22 15.25V10c0-1.11-.603-2.08-1.5-2.599v7.849a3.25 3.25 0 0 1-3.25 3.25H4.401Z" fill="currentColor"/></svg>
          Donate!
        </AccentButton>
      </div>
      
      <div className='section-3'>
        <p>{donators.length} Donators</p>
        {
          donators.length > 0 && donators.map((donator, i) => (
            <DonatorRow user={donator.donator} amount={donator.donation}/>
          ))
        }
      </div>
    </div>
  )
}

export default ProjectDetails
