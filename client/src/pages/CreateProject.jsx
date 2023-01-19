// Modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { checkIfImage } from '../utils';

// Context
import { useStateContext } from "../context";

// Components
import Loader from '../components/global/Loader';
import AccentButton from '../components/global/AccentButton';

// CSS
import './CreateProject.css';

const TextField = ({ label, placeholder, inputType, isTextArea, value, handleChange, icon, required, min }) => {
  return (
    <div className='text-field'>
      <p className='label'>{label}</p>
      <div className='box'>
        <div className='icon'>
          {icon}
        </div>
        {isTextArea ? (
          <textarea
            rows={4} 
            type={inputType} 
            placeholder={placeholder} 
            value={value} 
            onChange={handleChange} 
            required={required || true}
            min={min}
          />
        ) : (
          <input 
            step="0.001" 
            type={inputType} 
            placeholder={placeholder} 
            value={value} 
            onChange={handleChange} 
            required={required || true}
            min={min}
          />
        )}
        
      </div>
    </div>
  );
};

const CreateProject = () => {

  const navigate = useNavigate();
  const [isLoadingCreation, setIsLoadingCreation] = useState(false);
  const { publishProject, MIN_TARGET_AMOUNT } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists && form.target >= MIN_TARGET_AMOUNT) {
        setIsLoadingCreation(true);
        await publishProject({ ...form, target: ethers.utils.parseUnits(form.target, 18)});
        setIsLoadingCreation(false);
        navigate('/');
      } else {
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className='create-project'>
      <div className='creator-container'>

        <div className='titlebar'>
          <p>Create New Project</p>
        </div>

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
              <TextField
                handleChange={(e) => handleFormFieldChange('name', e)}
                inputType="text"
                label={"Username"}
                placeholder={"Username"}
                icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.575c0 .894-.32 1.76-.902 2.438-1.57 1.834-3.957 2.739-7.102 2.739-3.146 0-5.532-.905-7.098-2.74a3.75 3.75 0 0 1-.898-2.435v-.577a2.249 2.249 0 0 1 2.249-2.25h11.501Zm0 1.5H6.253a.749.749 0 0 0-.75.749v.577c0 .536.192 1.054.54 1.461 1.253 1.468 3.219 2.214 5.957 2.214s4.706-.746 5.962-2.214a2.25 2.25 0 0 0 .541-1.463v-.575a.749.749 0 0 0-.749-.75ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" fill="currentColor"/></svg>}
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
            <TextField
              handleChange={(e) => handleFormFieldChange('image', e)}
              inputType="url"
              label={"Image URL"}
              placeholder={"www.google.com/"}
              icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm.58 16.401-5.805-5.686a.75.75 0 0 0-.966-.071l-.084.07-5.807 5.687c.182.064.378.099.582.099h11.5c.203 0 .399-.035.58-.099l-5.805-5.686L18.33 19.4ZM17.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .208.036.408.103.594l5.823-5.701a2.25 2.25 0 0 1 3.02-.116l.128.116 5.822 5.702c.067-.186.104-.386.104-.595V6.25a1.75 1.75 0 0 0-1.75-1.75Zm-2.498 2a2.252 2.252 0 1 1 0 4.504 2.252 2.252 0 0 1 0-4.504Zm0 1.5a.752.752 0 1 0 0 1.504.752.752 0 0 0 0-1.504Z" fill="currentColor"/></svg>}
            />

            <div className='devider'></div>

            <div className='side-by-side'>
              <TextField
                handleChange={(e) => handleFormFieldChange('target', e)}
                inputType="number"
                min={MIN_TARGET_AMOUNT}
                label={"Goal (ETH)"}
                placeholder={MIN_TARGET_AMOUNT}
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

            <AccentButton
              buttonType="submit"
              height={"64px"}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.53 12.97a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l11-11a.75.75 0 0 0-1.06-1.06L8.5 16.94l-3.97-3.97Z" fill="currentColor"/></svg>
              Launch new Project!
            </AccentButton>
          </form>
        }
      </div>
    </div>
  );
};

export default CreateProject;
