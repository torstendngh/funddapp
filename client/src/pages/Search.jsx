// Modules
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleNavigateToProject } from '../utils'

// Context
import { useStateContext } from "../context/contractInterface";

// Components
import Card from '../components/global/Card';
import Loader from '../components/global/Loader';

// CSS
import './Search.css';

/**
 * Search page
 */
const Search = () => {

  const navigate = useNavigate();
  const { getSearchProjects, contract } = useStateContext(); // Get contract info

  const { state } = useLocation(); // Get project object from previous page

  const [isLoadingProjects, setIsLoadingProjects] = useState(false); // True if loading search results

  /**
   * Array with search results.
   * results[0]: results in title
   * results[1]: results in description
   */
  const [results, setResults] = useState([ [], [] ]);

  /**
   * Fetches projects that include search prompt
   * @param {string} search - the search prompt
   */
  const fetchResults = async (search) => {

    setIsLoadingProjects(true); // Show "Loader"

    const data = await getSearchProjects(search); // Get all projects
    setResults(data); // Put projects into local array

    setIsLoadingProjects(false);// Hide "Loader"

  }

  useEffect(() => {
    if(contract) fetchResults(state); // If contract connected, fetch search results
  }, [contract, state]);

  return (
    <div className='search'>
      {/* Results found in title */}
      <div className='title'>{results[0].length} {results[0].length == 1 ? "result" : "results"} found in title</div>
      <div className='card-grid'>

        {/* Show loader while results are loading */}
        {
          isLoadingProjects &&
          <Loader/>
        }

        {/* Map project search results to "Card" component */}
        {
          results[0].map((project) => <Card
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
      {/* Results found in description */}
      <div className='title'>{results[1].length} {results[1].length == 1 ? "result" : "results"} found in description</div>
      <div className='card-grid'>

        {/* Show loader while results are loading */}
        {
          isLoadingProjects &&
          <Loader/>
        }

        {/* Map project search results to "Card" component */}
        {
          results[1].map((project) => <Card
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

export default Search;
