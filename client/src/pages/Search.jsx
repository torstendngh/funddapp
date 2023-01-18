import React, { useState, useEffect } from 'react';
import Loader from '../components/global/Loader'
import Card from '../components/global/Card';
import './Search.css'
import { useLocation } from 'react-router-dom';
import { useStateContext } from "../context";

const Search = () => {

  const { state } = useLocation();

  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projects, setProjects] = useState([]);

  const { getSearchProjects } = useStateContext();

  const fetchProjects = async (search) => {
    setIsLoadingProjects(true);
    const data = await getSearchProjects(search);
    setProjects(data);
    setIsLoadingProjects(false);
  }

  useEffect(() => {
    fetchProjects(state);
    console.log(state)
  }, [state]);

  return (
    <div className='search'>
      <div className='title'>{projects.length} {projects.length == 1 ? "Result" : "Results"}</div>
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

export default Search
