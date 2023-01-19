import React, { useState, useEffect } from 'react';
import Loader from '../components/global/Loader'
import Card from '../components/global/Card';
import './Search.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from "../context";

const Search = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [results, setResults] = useState([ [], [] ]);

  const { getSearchProjects, contract } = useStateContext();

  const fetchResults = async (search) => {
    setIsLoadingProjects(true);
    const data = await getSearchProjects(search);
    setResults(data);
    setIsLoadingProjects(false);
  }

  const handleNavigate = (project) => {
    navigate(`/project-details/${project.title}`, { state: project })
  }

  useEffect(() => {
    if(contract) fetchResults(state);
  }, [contract, state]);

  return (
    <div className='search'>
      <div className='title'>{results[0].length} {results[0].length == 1 ? "result" : "results"} found in title</div>
      <div className='card-grid'>
        {
          isLoadingProjects &&
          <Loader/>
        }
        {
          results[0].map((project) => <Card
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
      <div className='title'>{results[1].length} {results[1].length == 1 ? "result" : "results"} found in description</div>
      <div className='card-grid'>
        {
          isLoadingProjects &&
          <Loader/>
        }
        {
          results[1].map((project) => <Card
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
