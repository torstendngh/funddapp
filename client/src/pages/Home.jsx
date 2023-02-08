// Modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleNavigateToProject, calculateBarPercentage } from '../utils'

// Context
import { useStateContext } from '../context/contractInterface';

// Components
import Card from '../components/global/Card';
import Loader from '../components/global/Loader';
import AccentButton from '../components/global/AccentButton';

// CSS
import './Home.css';

/**
 * Home page component
 */
const Home = () => {

  const navigate = useNavigate();
  const { address, contract, getProjects } = useStateContext(); // Get contract info

  const [isLoadingProjects, setIsLoadingProjects] = useState(false); // True when projects are loading

  /**
   * Array with all projects
   * TODO: algorithm to only show most interesting projects to user
   */
  const [projects, setProjects] = useState([]); // All projects
  const [closeToFinishingProjects, setCloseToFinishingProjects] = useState([]); // Close to finishing projects

  // Get all projects from blockchain
  const fetchProjects = async () => {

    setIsLoadingProjects(true); // Display "Loader" component

    const data = await getProjects(); // Get all projects
    setProjects(data); // Put projects into local array

    setCloseToFinishingProjects(data.filter((project) => calculateBarPercentage(project.goal, project.amountCollected) >= 50))

    setIsLoadingProjects(false); // Don't display "Loader" anymore

  };

  useEffect(() => {
    if(contract) fetchProjects(); // If contract connected, get project on page load
  }, [address, contract]);

  return (
    <div className='home'>

      {/* Background graphic */}
      <svg className='thing' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.06 122.88">
        <defs>  
          <linearGradient id="logo-gradient" x1="0%" y1="50%" x2="100%" y2="50%" > 
            <stop offset="0%" stopColor="#5700FF">
              <animate attributeName="stop-color" values="#5700FF; #b451ff; #5700FF" dur="1s" repeatCount="indefinite"></animate>
            </stop>
            <stop offset="100%" stopColor="#b451ff">
              <animate attributeName="stop-color" values="#b451ff; #5700FF; #b451ff" dur="1s" repeatCount="indefinite"></animate>
            </stop>
          </linearGradient> 
        </defs>
        <path d="M34.43 47.86L52.8 37.6V18.31a9.233 9.233 0 01-5.46-3.16L17.91 32.18c.35.98.54 2.03.54 3.13 0 .92-.13 1.8-.38 2.64l16.36 9.91zm11.35-35.38a9.231 9.231 0 01-.59-3.25c0-2.55 1.03-4.86 2.7-6.53S51.87 0 54.42 0c2.55 0 4.86 1.03 6.53 2.7a9.205 9.205 0 012.7 6.53c0 1.12-.2 2.19-.56 3.18l29.57 17.1c.21-.25.42-.5.65-.73a9.205 9.205 0 016.53-2.7c2.55 0 4.86 1.03 6.53 2.7a9.205 9.205 0 012.7 6.53c0 2.55-1.03 4.85-2.7 6.52a9.194 9.194 0 01-5.32 2.62v33.91c2.07.27 3.92 1.22 5.32 2.62 1.67 1.67 2.7 3.98 2.7 6.52a9.222 9.222 0 01-9.23 9.23 9.205 9.205 0 01-7.15-3.39l-29.61 17.12c.36.99.56 2.06.56 3.18 0 2.55-1.03 4.86-2.7 6.53a9.205 9.205 0 01-6.53 2.7c-2.55 0-4.86-1.03-6.53-2.7s-2.7-3.98-2.7-6.53c0-1.14.21-2.24.59-3.25L16.35 93.38a9.205 9.205 0 01-7.13 3.36c-2.55 0-4.86-1.03-6.53-2.7C1.03 92.37 0 90.06 0 87.51s1.03-4.85 2.7-6.52a9.242 9.242 0 015.25-2.62V44.44a9.18 9.18 0 01-5.25-2.62A9.164 9.164 0 010 35.3c0-2.55 1.03-4.86 2.7-6.53a9.205 9.205 0 016.53-2.7 9.205 9.205 0 017.16 3.4l29.39-16.99zm15.76 2.61a9.192 9.192 0 01-5.55 3.23V37.6l18.33 10.62 16.85-9.74c-.37-.99-.56-2.07-.56-3.18 0-1.08.19-2.13.53-3.09l-29.6-17.12zm36.69 29.3a9.159 9.159 0 01-4.92-2.56c-.19-.19-.37-.38-.54-.59l-16.82 9.72v20.78l16.89 9.75c.15-.17.3-.34.46-.5a9.194 9.194 0 014.92-2.56V44.39h.01zm-7.07 46.27c-.36-.98-.55-2.04-.55-3.14 0-1.16.21-2.27.61-3.3l-16.34-9.43-18.89 10.98v18.79a9.192 9.192 0 015.55 3.23l29.62-17.13zm-43.82 17.06a9.233 9.233 0 015.46-3.16V85.68l-18.96-11-16.09 9.29c.45 1.09.71 2.29.71 3.55 0 1.12-.2 2.19-.56 3.18l29.44 17.02zM10.76 78.41c1.93.32 3.66 1.25 4.99 2.58.1.1.19.2.28.3l16.39-9.46V50.36L16.64 40.8c-.27.37-.57.71-.89 1.03a9.255 9.255 0 01-4.99 2.58v34zM9.24 41.34c.04 0 .08-.01.12-.01h.08a6 6 0 004.06-1.76 6.023 6.023 0 001.77-4.27c0-1.67-.68-3.18-1.77-4.27-1.09-1.09-2.6-1.77-4.27-1.77s-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c0 1.67.68 3.18 1.77 4.27a6.03 6.03 0 004.28 1.77zm49.44 68.05a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77-1.09 1.09-1.77 2.6-1.77 4.27s.68 3.18 1.77 4.27 2.6 1.77 4.27 1.77c1.67 0 3.18-.68 4.27-1.77 1.09-1.09 1.77-2.6 1.77-4.27s-.67-3.18-1.77-4.27zm0-104.43a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77s-1.77 2.6-1.77 4.27c0 1.67.68 3.18 1.77 4.27a6.023 6.023 0 004.27 1.77c1.67 0 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27c0-1.67-.67-3.18-1.77-4.27zm45.42 78.29a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c0 1.67.68 3.18 1.77 4.27a6.023 6.023 0 004.27 1.77c1.67 0 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27c0-1.67-.67-3.18-1.77-4.27zm-90.6 0c-1.09-1.09-2.6-1.77-4.27-1.77s-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c0 1.67.68 3.18 1.77 4.27s2.6 1.77 4.27 1.77 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27 6.065 6.065 0 00-1.77-4.27zm80.95-45.22c.08.08.14.18.2.28.06.1.1.2.14.31.23.34.49.66.77.95a6.023 6.023 0 004.27 1.77c1.67 0 3.18-.68 4.27-1.77a6.023 6.023 0 001.77-4.27c0-1.67-.68-3.18-1.77-4.27a6.023 6.023 0 00-4.27-1.77c-1.67 0-3.18.68-4.27 1.77a6.023 6.023 0 00-1.77 4.27c.01.99.25 1.91.66 2.73zM35.41 71.49a1.687 1.687 0 01.43.88l17.13 10.07V62.56L35.41 52.11v19.38zm37.56-19.11L55.96 62.57v19.89l17.01-10.05V52.38zM54.39 39.99l-16.6 9.93 16.69 10.05 16.21-9.84-16.3-10.14z" fillRule="evenodd" clipRule="evenodd" fill="url('#logo-gradient')"/>
      </svg>

      {/* Big bold text */}
      <p className='big-title'>
        Smart <br />
        Crowdfunding_
      </p>

      {/* Features */}
      <div className='feature-list'>
        <div className='item'>
          <svg xmlns="http://www.w3.org/2000/svg" width="26.003" height="26.003" viewBox="0 0 26.003 26.003">
            <path id="icons8-scroll" d="M5.747,1A2.677,2.677,0,0,0,3.064,3.683V19.573a.619.619,0,1,0,1.238,0V3.683A1.436,1.436,0,0,1,5.747,2.238h16.3a2.63,2.63,0,0,0-.413,1.445V24.32a1.445,1.445,0,1,1-2.889,0V22.256a.608.608,0,0,0-.619-.619H1.619A.608.608,0,0,0,1,22.256V24.32A2.677,2.677,0,0,0,3.683,27h16.51a2.677,2.677,0,0,0,2.683-2.683V3.683a1.445,1.445,0,1,1,2.889,0V5.127H24.32a.619.619,0,0,0,0,1.238h2.064A.608.608,0,0,0,27,5.747V3.683A2.677,2.677,0,0,0,24.32,1Zm4.747,4.127a.619.619,0,1,0,0,1.238h4.953a.619.619,0,0,0,0-1.238ZM7.81,11.319a.619.619,0,1,0,0,1.238H18.129a.619.619,0,1,0,0-1.238Zm.041,3.1a.619.619,0,1,0,0,1.238h7.223a.619.619,0,0,0,0-1.238Zm10.277,0a.619.619,0,1,0,.619.619A.619.619,0,0,0,18.129,14.414ZM2.238,22.875H17.51V24.32a2.814,2.814,0,0,0,.413,1.445H3.683A1.436,1.436,0,0,1,2.238,24.32Z" transform="translate(-1 -1)" fill="currentColor"/>
          </svg>
          Smart Contract based
        </div>
        <div className='devider'></div>
        <div className='item'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24.938" height="24.938" viewBox="0 0 24.938 24.938">
            <path id="icons8-ethereum" d="M13.469,1A12.469,12.469,0,1,0,25.938,13.469,12.482,12.482,0,0,0,13.469,1Zm0,1.188A11.281,11.281,0,1,1,2.188,13.469,11.294,11.294,0,0,1,13.469,2.188Zm0,2.739a.594.594,0,0,0-.513.295L8.321,13.17a.6.6,0,0,0,0,.6l4.635,7.946a.593.593,0,0,0,1.025,0l4.635-7.946a.6.6,0,0,0,0-.6L13.981,5.222A.594.594,0,0,0,13.469,4.927Zm0,1.774,3.8,6.507-3.8,2.167-3.8-2.167ZM10.411,15l2.763,1.579a.6.6,0,0,0,.295.079.579.579,0,0,0,.295-.079L16.526,15l-3.058,5.241Z" transform="translate(-1 -1)" fill="currentColor"/>
          </svg>
          Ethereum Blockchain
        </div>
        <div className='devider'></div>
        <div className='item'>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24.938" viewBox="0 0 19 24.938">
            <path id="icons8-lock" d="M22.927,1a3.565,3.565,0,0,0-3.562,3.563V7.1A4.559,4.559,0,0,0,16,11.49v9.9a4.558,4.558,0,0,0,4.552,4.552h9.9A4.558,4.558,0,0,0,35,21.385v-9.9A4.559,4.559,0,0,0,31.635,7.1V4.563A3.565,3.565,0,0,0,28.073,1Zm0,1.188h5.146a2.377,2.377,0,0,1,2.375,2.375V6.938h-9.9V4.563A2.377,2.377,0,0,1,22.927,2.188ZM20.552,8.125h9.9a3.369,3.369,0,0,1,3.365,3.365v9.9a3.369,3.369,0,0,1-3.365,3.365h-9.9a3.369,3.369,0,0,1-3.365-3.365v-9.9A3.369,3.369,0,0,1,20.552,8.125Zm4.948,5.74a2.572,2.572,0,0,0-.594,5.075V20.4a.594.594,0,1,0,1.187,0V18.939a2.572,2.572,0,0,0-.594-5.075Zm0,1.188a1.385,1.385,0,1,1-1.385,1.385A1.387,1.387,0,0,1,25.5,15.052Z" transform="translate(-16 -1)" fill="currentColor"/>
          </svg>
          Secure
        </div>
      </div>

      {/* Get started button */}
      <AccentButton
        handleClick={() => {
          navigate('get-started')
        }}
      >
        Get Started
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.001c5.524 0 10 4.477 10 10s-4.476 10-10 10c-5.522 0-10-4.477-10-10s4.478-10 10-10Zm.781 5.469-.084-.073a.75.75 0 0 0-.883-.007l-.094.08-.072.084a.75.75 0 0 0-.007.883l.08.094 2.719 2.72H7.75l-.102.006a.75.75 0 0 0-.641.642L7 12l.007.102a.75.75 0 0 0 .641.641l.102.007h6.69l-2.72 2.72-.073.085a.75.75 0 0 0 1.05 1.05l.083-.073 4.002-4 .072-.085a.75.75 0 0 0 .008-.882l-.08-.094-4-4.001-.085-.073.084.073Z" fill="currentColor"/></svg>
      </AccentButton>

      <div className='title'>Close to finishing</div>

      {/* Projects list */}
      <div className='card-grid'>

        {/* Show "Loader" if loading projects */}
        {
          isLoadingProjects &&
          <Loader/>
        }

        {/* Map projects to "Card" components */}
        {
          closeToFinishingProjects.map((project) => <Card
            key={project.pId}
            owner={project.owner}
            title={project.title}
            image={project.image}
            deadline={project.deadline}
            goal={project.goal}
            amountCollected={project.amountCollected}
            handleClick={() => handleNavigateToProject(navigate, project)}
          />)
        }

      </div>

      <div className='title'>All projects</div>

      {/* Projects list */}
      <div className='card-grid'>

        {/* Show "Loader" if loading projects */}
        {
          isLoadingProjects &&
          <Loader/>
        }

        {/* Map projects to "Card" components */}
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
          />)
        }

      </div>
    </div>
  );
};

export default Home;
