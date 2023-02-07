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
  const { connect, address } = useStateContext(); // Get connect function and address variable

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
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7Z" fill="currentColor"/></svg>
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
