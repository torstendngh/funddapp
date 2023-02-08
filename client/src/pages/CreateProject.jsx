// Modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { checkIfImage } from '../utils';

// Context
import { useStateContext } from "../context/contractInterface";

// Components
import Loader from '../components/global/Loader';
import AccentButton from '../components/global/AccentButton';
import TextField from '../components/createProject/TextField'
import NotificationWindow from '../components/global/NotificationWindow';

// CSS
import './CreateProject.css';

/**
 * Create project page
 */
const CreateProject = () => {

  const navigate = useNavigate();
  const { publishProject, MIN_GOAL_AMOUNT } = useStateContext(); // Get contract info

  const [isLoadingCreation, setIsLoadingCreation] = useState(false); // When the project is getting created this turns true to show "Loader" component

  // Notification window options
  const [notificationWindowOptions, setNotificationWindowOptions] = useState({
    show: false,
    text: "",
    buttonText: "Okay"
  });

  // Form to be sent for project creation
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal: '', 
    deadline: '',
    image: ''
  });

  // Sync UI with form state
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  // When "Launch new Project!" button is pressed
  const handleSubmit = async (e) => {

    e.preventDefault(); // Important! Stop default behaviour of form "submit" button

    

    checkIfImage(form.image, async (exists) => {

      // Check if URL points to valid image
      if(
        exists && form.goal >= MIN_GOAL_AMOUNT
        && form.title != ''
        && form.description != ''
        && form.goal != ''
        && form.deadline != ''
        && form.image != ''
      ) {

        setIsLoadingCreation(true); // Show "Loader" component

        await publishProject({ ...form, goal: ethers.utils.parseUnits(form.goal, 18)}); // Publish project
        
        setIsLoadingCreation(false); // Hide "Loader" again

        navigate('/'); // Navigate to homepage
        
      } else {
        setForm({ ...form, image: '' }); // Reset image form
        setNotificationWindowOptions({
          ...notificationWindowOptions, 
          show: true,
          text: "Image URL invalid."
        })
      }
    });

  };

  return (
    <div className='create-project'>
      <div className='creator-container'>

        { notificationWindowOptions.show &&
          <NotificationWindow
            handleButtonClick={() => setNotificationWindowOptions({...notificationWindowOptions, show: false})}
            text={notificationWindowOptions.text}
            buttonText={notificationWindowOptions.buttonText}
          />
        }

        <div className='titlebar'>
          <p>Create New Project</p>
        </div>

        {/* Show "Loader" component or form */}
        { isLoadingCreation ?
          <Loader text={"Uploading Project to Blockchain.."}/>
          :
          <form onSubmit={handleSubmit} className='content'>
            <div className='side-by-side'>
              <TextField
                handleChange={(e) => handleFormFieldChange('title', e)}
                inputType="text"
                label={"Project Title"}
                placeholder={"Title"}
                icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.75A.75.75 0 0 1 5.75 4h12.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V5.5h-4.75v13h1.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h1.5v-13H6.5v1.25a.75.75 0 0 1-1.5 0v-2Z" fill="currentColor"/></svg>}
              />
            </div>
            
            <TextField
              handleChange={(e) => handleFormFieldChange('description', e)}
              inputType="text"
              isTextArea
              label={"Description"}
              placeholder={"Description"}
              icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 5.75A.75.75 0 0 1 2.75 5h15.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 5.75ZM2 18.75a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75ZM2.75 11.5a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 0-1.5H2.75Z" fill="currentColor"/></svg>}
            />
            
            <div className='side-by-side'>
              {
                form.image != 0 &&
                <img className='imagePreview' src={form.image}/>
              }
              <TextField
                handleChange={(e) => handleFormFieldChange('image', e)}
                inputType="url"
                label={"Image URL"}
                placeholder={"www.google.com/imageURL"}
                icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm.58 16.401-5.805-5.686a.75.75 0 0 0-.966-.071l-.084.07-5.807 5.687c.182.064.378.099.582.099h11.5c.203 0 .399-.035.58-.099l-5.805-5.686L18.33 19.4ZM17.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .208.036.408.103.594l5.823-5.701a2.25 2.25 0 0 1 3.02-.116l.128.116 5.822 5.702c.067-.186.104-.386.104-.595V6.25a1.75 1.75 0 0 0-1.75-1.75Zm-2.498 2a2.252 2.252 0 1 1 0 4.504 2.252 2.252 0 0 1 0-4.504Zm0 1.5a.752.752 0 1 0 0 1.504.752.752 0 0 0 0-1.504Z" fill="currentColor"/></svg>}
              />
            </div>

            <div className='devider'></div>

            <div className='side-by-side'>
              <TextField
                handleChange={(e) => handleFormFieldChange('goal', e)}
                inputType="number"
                min={MIN_GOAL_AMOUNT}
                label={"Goal (ETH)"}
                placeholder={MIN_GOAL_AMOUNT}
                icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3.747a.75.75 0 0 1 .75-.75h16.504a.75.75 0 0 1 .6 1.2L16.69 9.748l4.164 5.552a.75.75 0 0 1-.6 1.2H4.5v4.749a.75.75 0 0 1-.648.743L3.75 22a.75.75 0 0 1-.743-.648L3 21.249V3.747Zm15.754.75H4.5V15h14.254l-3.602-4.802a.75.75 0 0 1 0-.9l3.602-4.8Z" fill="currentColor"/></svg>}
              />
              <TextField
                handleChange={(e) => handleFormFieldChange('deadline', e)}
                inputType="date"
                label={"Deadline"}
                icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm0 1.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM12 8a.75.75 0 0 1 .743.648l.007.102v4.5a.75.75 0 0 1-1.493.102l-.007-.102v-4.5A.75.75 0 0 1 12 8Zm7.147-2.886.083.06 1.158.964a.75.75 0 0 1-.877 1.212l-.082-.06-1.159-.964a.75.75 0 0 1 .877-1.212ZM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5Z" fill="currentColor"/></svg>}
              />
            </div>

            <div className='devider'></div>

            {/* "Launch project" submit button */}
            <AccentButton
              buttonType="submit"
              height={"64px"}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z" fill="currentColor"/></svg>
              Launch new Project!
            </AccentButton>
          </form>
        }
      </div>
    </div>
  );
};

export default CreateProject;
