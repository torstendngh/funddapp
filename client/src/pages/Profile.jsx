// Modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleNavigateToProject } from '../utils'

// Context
import { useStateContext } from "../context/contractInterface";

// Components
import Loader from '../components/global/Loader'
import Card from '../components/global/Card';
import AccentButton from '../components/global/AccentButton';

// CSS
import './Profile.css';

/**
 * Profile page
 */
const Profile = () => {

  const navigate = useNavigate();
  const { disconnect, address, contract, getUserProjects, connect, withdrawProjectFunds } = useStateContext(); // Get contract info

  const [isLoadingProjects, setIsLoadingProjects] = useState(false); // True when projects are loading
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState({
    loading: false,
    projectName: '',
    withdrawAmount: ''
  }); // loading true when loading withdraw with options

  const [projects, setProjects] = useState([]); // Array with all projects
  const [finishedProjects, setFinishedProjects] = useState([]); // Array with all projects

  // Get user projects from blockchain
  const fetchProjects = async () => {

    setIsLoadingProjects(true); // Display "Loader" component
  
    const data = await getUserProjects(); // Get user projects
    setProjects(data); // Put projects into local array

    setFinishedProjects(data.filter((project) => project.amountCollected >= project.goal))

    setIsLoadingProjects(false); // Don't display "Loader" anymore

  };

  // "Disconnect Address" button handler
  const handleDisconnectUser = () => {
    disconnect()
    navigate('/') // Navigat to homepage
  }

  /**
   * Checks if project is successfully fullfilled
   * @param {object} project 
   * @returns {boolean}
   */
  const isFullfilled = (project) => {
    if (
      project.amountCollected >= project.goal
      && project.pId != 0
    ) {
      return true;
    }
    return false;
  }

  /**
   * Withdraws funds if project fullfilled
   * @param {object} project 
   * @returns {boolean}
   */
  const handleWithdraw = async (project) => {
    if (isFullfilled(project)) {
      setIsLoadingWithdraw({
        loading: true,
        projectName: project.title,
        withdrawAmount: project.amountCollected
      })
      await withdrawProjectFunds(project.pId)
      setIsLoadingWithdraw({
        loading: false,
        projectName: '',
        withdrawAmount: '',
      })
      navigate('/');// Navigate to home page
    } else {
      // TODO: Error notification
    }
  }

  useEffect(() => {
    // If contract connected, fetch user projects, else try and connect user
    if(contract) {
      fetchProjects();
    } else {
      connect();
    }
  }, [address, contract]);

  return (
    <div className='profile'>

      {/* Fullscreen withdrawing loader */}
      {
        isLoadingWithdraw.loading &&
        <div className='loading-screen'>
          <Loader text={`Withdrawing ${isLoadingWithdraw.withdrawAmount} ETH from project "${isLoadingWithdraw.projectName}"`}/>
        </div>
      }

      <div className='title'>My Profile</div>
      <div className='address-container'>
        <div className='title'>Account address</div>
        {address}
      </div>

      {/* User logout button */}
      <AccentButton handleClick={() => handleDisconnectUser()} >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.707 3.707a1 1 0 0 0-1.414-1.414L18.496 4.09a4.252 4.252 0 0 0-5.251.604l-1.068 1.069a1.75 1.75 0 0 0 0 2.474l3.585 3.586a1.75 1.75 0 0 0 2.475 0l1.068-1.068a4.252 4.252 0 0 0 .605-5.25l1.797-1.798ZM10.707 11.707a1 1 0 0 0-1.414-1.414l-1.47 1.47-.293-.293a.75.75 0 0 0-1.06 0l-1.775 1.775a4.252 4.252 0 0 0-.605 5.25l-1.797 1.798a1 1 0 1 0 1.414 1.414l1.798-1.797a4.252 4.252 0 0 0 5.25-.605l1.775-1.775a.75.75 0 0 0 0-1.06l-.293-.293 1.47-1.47a1 1 0 0 0-1.414-1.414l-1.47 1.47-1.586-1.586 1.47-1.47Z" fill="currentColor"/></svg>
        Disconnect Address
      </AccentButton>

      {
        finishedProjects.length > 0 &&
        <>
          <div className='title'>My finished Projects ({finishedProjects.length})</div>

          {/* User projects list */}
          <div className='card-grid'>

            {/* Show "Loader" while loading projects */}
            {
              isLoadingProjects &&
              <Loader/>
            }

            {/* Map user projects to "Card" components */}
            {
              finishedProjects.map((project) => <Card
                key={project.pId}
                owner={project.owner}
                title={project.title}
                image={project.image}
                deadline={project.deadline}
                goal={project.goal}
                amountCollected={project.amountCollected}
                handleClick={() => handleNavigateToProject(navigate, project)}
                hasWithdrawButton={ isFullfilled(project) }
                handleWithdraw={() => handleWithdraw(project)}
              />)
            }

          </div>
        </>
      }

      <div className='title'>All of my Projects ({projects.length})</div>

      {/* User projects list */}
      <div className='card-grid'>

        {/* Show "Loader" while loading projects */}
        {
          isLoadingProjects &&
          <Loader/>
        }

        {/* Map user projects to "Card" components */}
        {
          projects.map((project) => <Card
            key={project.pId}
            owner={project.owner}
            title={project.title}
            image={project.image}
            deadline={project.deadline}
            goal={project.goal}
            amountCollected={project.amountCollected}
            handleClick={() => handleNavigateToProject(navigate, project)}
            hasWithdrawButton={ isFullfilled(project) }
            handleWithdraw={() => handleWithdraw(project)}
          />)
        }

      </div>
    </div>
  );
};

export default Profile;
