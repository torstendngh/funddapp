import React, { Fragment, useState } from 'react';
import ProfileIcon from '../navbar/ProfileIcon';
import AccentButton from './AccentButton';
import Logo from './Logo';
import './Navbar.css';
import Searchbar from './Searchbox';
import { useStateContext } from "../../context";
import { Link, useNavigate } from 'react-router-dom';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

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
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.25 13a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2Zm3-7.25A2.75 2.75 0 0 0 16.5 3H5.25a2.25 2.25 0 0 0-2.244 2.409A.757.757 0 0 0 3 5.5v12.25A3.25 3.25 0 0 0 6.25 21h12.5a2.75 2.75 0 0 0 2.75-2.75v-9.5a2.75 2.75 0 0 0-2.25-2.705V5.75ZM4.5 5.25a.75.75 0 0 1 .75-.75H16.5c.69 0 1.25.56 1.25 1.25V6H5.25a.75.75 0 0 1-.75-.75Zm.75 2.25h13.5c.69 0 1.25.56 1.25 1.25v9.5c0 .69-.56 1.25-1.25 1.25H6.25a1.75 1.75 0 0 1-1.75-1.75V7.372c.235.083.487.128.75.128Z" fill="currentColor"/>
            </svg>
            Connect to Wallet
          </Fragment>
        }
      </AccentButton>
      <ProfileIcon/>
    </div>
  );
};

export default Navbar;
