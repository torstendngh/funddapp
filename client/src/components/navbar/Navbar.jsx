// Modules
import React from 'react';
import { useStateContext } from "../../context/contractInterface";
import { useNavigate } from 'react-router-dom';

// Components
import ProfileIcon from './ProfileIcon';
import AccentButton from '../global/AccentButton';
import Logo from '../global/Logo';
import Searchbar from './Searchbox';

// Images
import metamaskIcon from "../../assets/img/metamask-icon.png";

// CSS
import './Navbar.css';

/**
 * Navbar component
 */
const Navbar = () => {

  const navigate = useNavigate();

  // Get connect function and address variable
  const { connect, address } = useStateContext();

  // Handle click on "Create Project" or "Connect to MetaMask" button
  const handleClick = () => {
    if(address) {
      /**
       * If there is an address, user must be already connected,
       * so take user to project creation page.
       */
      navigate('create-project')
    } else {
      /**
       * If there is no address, the user isn't connected,
       * so start wallet connection process.
       */
      connect()
    }
  }

  return (
    <div className='navbar'>

      {/* Logo */}
      <Logo/>

      {/* Push other elements to other side of navbar */}
      <div className='flex'></div>

      {/* Navbar */}
      <Searchbar/>

      {/* "Create Project" or "Connect to MetaMask" button */}
      <AccentButton
        buttonType="button"
        handleClick={() => handleClick()}
      >
        { address ?
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path id="Path_1" data-name="Path 1" d="M11.883,3.007,12,3a1,1,0,0,1,.993.883L13,4v7h7a1,1,0,0,1,.993.883L21,12a1,1,0,0,1-.883.993L20,13H13v7a1,1,0,0,1-.883.993L12,21a1,1,0,0,1-.993-.883L11,20V13H4a1,1,0,0,1-.993-.883L3,12a1,1,0,0,1,.883-.993L4,11h7V4a1,1,0,0,1,.883-.993L12,3Z" transform="translate(-3 -3)" fill="currentColor"/>
            </svg>
            Create Project
          </>
          : 
          <>
            <img src={metamaskIcon} alt="" height="18" width="18"/>
            Connect to MetaMask
          </>
        }
      </AccentButton>

      {/* Profile picture button only shown if user is connected */}
      {
        address &&
        <ProfileIcon
          handleClick={() => navigate('profile')}
          address={address}
        />
      }
      
    </div>
  );
};

export default Navbar;
