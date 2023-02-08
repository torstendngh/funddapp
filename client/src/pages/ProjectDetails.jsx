// Modules
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateBarPercentage, daysLeftExactly } from '../utils';
import { toSvg } from '../utils/jdenticon';

// Context
import { useStateContext } from '../context/contractInterface';

// Components
import Loader from '../components/global/Loader';
import AccentButton from '../components/global/AccentButton';
import DonatorRow from '../components/projectDetails/DonatorRow'

// CSS
import './ProjectDetails.css';
import NotificationWindow from '../components/global/NotificationWindow';

/**
 * Project details page component
 */
const ProjectDetails = () => {

  const navigate = useNavigate();
  const { donate, getDonations, contract, address, MIN_GOAL_AMOUNT } = useStateContext(); // Get contract info
  const { state } = useLocation(); // Get project details from previous page / location

  const [isLoading, setIsLoading] = useState(false); // True when donation is loading
  const [isLoadingDonators, setIsLoadingDonators] = useState(true);// True when donators list is loading
  
  const [amount, setAmount] = useState(''); // The amount the user wants to donate

  const [remainingDays, setRemainingDays] = useState(daysLeftExactly(state.deadline)); // How much time is left
  const percentage = calculateBarPercentage(state.goal, state.amountCollected); // Calculate progress bar percentage

  // Notification window options
  const [notificationWindowOptions, setNotificationWindowOptions] = useState({
    show: false,
    text: "",
    buttonText: "Okay"
  });

  const [donators, setDonators] = useState([]); // Array containing the donators

  // Get donators list
  const fetchDonators = async () => {

    setIsLoadingDonators(true); // Display "Loader" component

    const data = await getDonations(state.pId); // Get donators of project
    setDonators(data); // Put donators of project into local array

    setIsLoadingDonators(false); // Don't display "Loader" anymore
    
  };

  useEffect(() => {
    // If contract connected, fetch project and donators
    if(contract) {
      fetchDonators();
    }

    const interval = setInterval(() => {
      setRemainingDays(daysLeftExactly(state.deadline)) // Refreshes "time left" every second
    }, 1000);
    
  }, [contract, address]); 

  // On "Donate!" button press
  const handleDonate = async () => {
    if (
      amount >= MIN_GOAL_AMOUNT
      && address
    ) {
      
      setIsLoading(true); // Show fullscreen loader while donation is loading

      await donate(state.pId, amount); // Donate amount to project
      setIsLoading(false); // Hide fullscreen loader when donation complete

      navigate('/');// Navigate to home page

    } else if (
      amount >= MIN_GOAL_AMOUNT
      && !address
    ) {

      setNotificationWindowOptions({
        ...notificationWindowOptions, 
        show: true,
        text: "Please log in."
      })

    } else if (
      amount < MIN_GOAL_AMOUNT
      && address
    ) {

      setNotificationWindowOptions({
        ...notificationWindowOptions, 
        show: true,
        text: "Please specify ETH amount you want to donate."
      })

    } else if (
      amount < MIN_GOAL_AMOUNT
      && !address
    ) {

      setNotificationWindowOptions({
        ...notificationWindowOptions, 
        show: true,
        text: "Please log in and specify ETH amount you want to donate."
      })

    }

  };

  return (
    <div className='project-details'>

      {/* Fullscreen loader */}
      {
        isLoading &&
        <div className='loading-screen'>
          <Loader text={`Donating ${amount || "0.001"} ETH to project "${state.title}"`}/>
        </div>
      }

      {/* Notification if no amount specified */}
      {
        notificationWindowOptions.show &&
        <NotificationWindow
          handleButtonClick={() => setNotificationWindowOptions({...notificationWindowOptions, show: false})}
          text={notificationWindowOptions.text}
          buttonText={notificationWindowOptions.buttonText}
        />
      }
      
      <div className='section-0'>

        {/* Project image */}
        <div className='image-container'>
          <img className='image' src={state.image} alt="" />
          <img className='blur-image' src={state.image} alt="" />
        </div>
        
        {/* Project title and description */}
        <div className='info-container'>
          <p className='title'>{state.title}</p>
          <div className='username'>
            <div className='profile-picture'  dangerouslySetInnerHTML={{__html: toSvg(state.owner, 24)}}></div>
            {state.owner}
          </div>
          <p className='description'>{state.description}</p>
          {/* TODO: make these button work */}
          <div className='button-row'>
            {/* Favorite button */}
            <button>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.82 5.58-.82.822-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599 5.38 5.38 0 0 0-7.611 0Zm6.548 6.54L12 19.485 4.635 12.12a3.875 3.875 0 1 1 5.48-5.48l1.358 1.357a.75.75 0 0 0 1.073-.012L13.88 6.64a3.88 3.88 0 0 1 5.487 5.48Z" fill="currentColor"/></svg>
            </button>
            {/* Share button */}
            <button>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 2.498a3.502 3.502 0 1 1-2.597 5.851l-4.558 2.604a3.5 3.5 0 0 1 0 2.093l4.557 2.606a3.502 3.502 0 1 1-.745 1.302L9.1 14.347a3.502 3.502 0 1 1 0-4.698l4.557-2.604A3.502 3.502 0 0 1 17 2.498Zm0 13.5a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm-10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Zm10.498-6a2.002 2.002 0 1 0 0 4.004 2.002 2.002 0 0 0 0-4.004Z" fill="currentColor"/></svg>
            </button>
            {/* Report button */}
            <button>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.91 2.782a2.25 2.25 0 0 1 2.975.74l.083.138 7.759 14.009a2.25 2.25 0 0 1-1.814 3.334l-.154.006H4.243a2.25 2.25 0 0 1-2.041-3.197l.072-.143L10.031 3.66a2.25 2.25 0 0 1 .878-.878Zm9.505 15.613-7.76-14.008a.75.75 0 0 0-1.254-.088l-.057.088-7.757 14.008a.75.75 0 0 0 .561 1.108l.095.006h15.516a.75.75 0 0 0 .696-1.028l-.04-.086-7.76-14.008 7.76 14.008ZM12 16.002a.999.999 0 1 1 0 1.997.999.999 0 0 1 0-1.997ZM11.995 8.5a.75.75 0 0 1 .744.647l.007.102.004 4.502a.75.75 0 0 1-1.494.103l-.006-.102-.004-4.502a.75.75 0 0 1 .75-.75Z" fill="currentColor"/></svg>
            </button>
          </div>
        </div>

      </div>

      {/* Project details box */}
      <div className='section-1'>
        <div>
          <p className='title'>Completed</p>
          <p className='value'>{percentage}%</p>
        </div>
        <div>
          <p className='title'>Goal</p>
          <p className='value'>{state.goal} ETH</p>
        </div>
        <div>
          <p className='title'>Collected</p>
          <p className='value'>{state.amountCollected} ETH</p>
        </div>
        <div>
          <p className='title'>Time left</p>
          <p className='value'>{remainingDays}</p>
        </div>
      </div>

      {/* Project progress bar */}
      <div className='progress-container'>
        <div className='progress' style={{ width: `${percentage}%`, maxWidth: '100%'}}></div>
      </div>

      {/* Donate to project section */}
      <div className='section-2'>
        <p>ETH:</p>
        {/* ETH input */}
        <input min={MIN_GOAL_AMOUNT} value={amount} step="0.001" placeholder={MIN_GOAL_AMOUNT} type="number" onChange={(e) => setAmount(e.target.value)} />
        {/* Donate button */}
        <AccentButton
          buttonType="button"
          handleClick={handleDonate}
          height="64px"
          width="400px"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z" fill="currentColor"/></svg>
          Donate!
        </AccentButton>
      </div>
      
      {/* Donators list */}
      <div className='section-3'>

        <p>{donators.length} Donators</p>

        {/* Show loader while list is loading */}
        {
          isLoadingDonators && <Loader/>
        }

        {/* Map donators to "DonatorRow" component / TODO: MATH.RANDOM KEY IS PLACEHOLDER */}
        {
          donators.length > 0 && donators.map((donator, i) => (
            <DonatorRow user={donator.donator} amount={donator.donation} key={donator.donator + Math.random()}/>
          ))
        }
        
      </div>

    </div>
  );
};

export default ProjectDetails;
