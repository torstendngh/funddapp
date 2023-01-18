import React, { Fragment, useState } from 'react';
import ProfileIcon from '../navbar/ProfileIcon';
import AccentButton from './AccentButton';
import Logo from './Logo';
import './Navbar.css';
import Searchbar from './Searchbox';
import { useStateContext } from "../../context";
import { Link, useNavigate } from 'react-router-dom';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import metamaskIcon from "../../assets/img/metamask-icon.png"

const getWalletBalance = async (address) => {
  return await ThirdwebSDK.getBalance(address)
}

const Navbar = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const { connect, address } = useStateContext();

  return (
    <div id='navbar'>
      <Logo/>
      <div className='flex'></div>
      <Searchbar/>
      <AccentButton
        buttonType="button"
        handleClick={() => {
          if(address) navigate('create-project')
          else connect()
        }}
      >
        { address ?
          <Fragment>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path id="Path_1" data-name="Path 1" d="M11.883,3.007,12,3a1,1,0,0,1,.993.883L13,4v7h7a1,1,0,0,1,.993.883L21,12a1,1,0,0,1-.883.993L20,13H13v7a1,1,0,0,1-.883.993L12,21a1,1,0,0,1-.993-.883L11,20V13H4a1,1,0,0,1-.993-.883L3,12a1,1,0,0,1,.883-.993L4,11h7V4a1,1,0,0,1,.883-.993L12,3Z" transform="translate(-3 -3)" fill="currentColor"/>
            </svg>
            Create Project
          </Fragment>
          : 
          <Fragment>
            <img src={metamaskIcon} alt="" height="18" width="18"/>
            Connect to MetaMask
          </Fragment>
        }
      </AccentButton>
      <ProfileIcon/>
    </div>
  );
};

export default Navbar;
