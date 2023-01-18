import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'
import { useStateContext } from "../context";
import Loader from '../components/global/Loader'
import Card from '../components/global/Card';
import AccentButton from '../components/global/AccentButton';

const Profile = () => {

  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const { disconnect, address, contract, getUserProjects, connect } = useStateContext();

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    const data = await getUserProjects();
    setProjects(data);
    setIsLoadingProjects(false);
  }

  const handleNavigate = (project) => {
    navigate(`/project-details/${project.title}`, { state: project })
  }

  useEffect(() => {
    if(contract) fetchProjects();
    else connect();
  }, [address, contract]);

  return (
    <div className='profile'>
      <div className='title'>My Profile</div>
      <div className='address-container'>
        <div className='title'>Account address</div>
        {address}
      </div>
      <AccentButton
        handleClick={() => {
          disconnect()
          navigate('/')
        }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.78 3.28a.75.75 0 0 0-1.06-1.06l-2.012 2.012a4.251 4.251 0 0 0-5.463.462l-1.068 1.069a1.75 1.75 0 0 0 0 2.474l3.585 3.586a1.75 1.75 0 0 0 2.475 0l1.068-1.068a4.251 4.251 0 0 0 .463-5.463L21.78 3.28Zm-3.585 2.475.022.023.003.002.002.003.023.022a2.75 2.75 0 0 1 0 3.89l-1.068 1.067a.25.25 0 0 1-.354 0l-3.586-3.585a.25.25 0 0 1 0-.354l1.068-1.068a2.75 2.75 0 0 1 3.89 0ZM10.78 11.28a.75.75 0 1 0-1.06-1.06L8 11.94l-.47-.47a.75.75 0 0 0-1.06 0l-1.775 1.775a4.251 4.251 0 0 0-.463 5.463L2.22 20.72a.75.75 0 1 0 1.06 1.06l2.012-2.012a4.251 4.251 0 0 0 5.463-.463l1.775-1.775a.75.75 0 0 0 0-1.06l-.47-.47 1.72-1.72a.75.75 0 1 0-1.06-1.06L11 14.94 9.06 13l1.72-1.72Zm-3.314 2.247.004.003.003.004 2.993 2.993.004.003.003.004.466.466-1.244 1.245a2.75 2.75 0 0 1-3.89 0l-.05-.05a2.75 2.75 0 0 1 0-3.89L7 13.062l.466.466Z" fill="currentColor"/></svg>
        Disconnect Address
      </AccentButton>
      <div className='title'>My Projects ({projects.length})</div>
      <div className='card-grid'>
        {
          isLoadingProjects &&
          <Loader/>
        }
        {
          projects.map((project) => <Card
            key={project.id}
            owner={project.owner}
            title={project.title}
            image={project.image}
            deadline={project.deadline}
            target={project.target}
            amountCollected={project.amountCollected}
            handleClick={() => handleNavigate(project)}
          />)
        }
      </div>
    </div>
  )
}

export default Profile
