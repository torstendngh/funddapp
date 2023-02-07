// Modules
import React from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './Searchbox.css';

/**
 * Searchbox component in navbar
 */
const Searchbox = () => {

  const navigate = useNavigate();
  
  // Go to "/search" page with searchbox text when enter button is pressed
  const handleSearch = (e) => {
    if (e.key === 'Enter'){
      navigate(`/search`, { state: e.target.value });
    }
  };

  return (
    <div className='searchbox'>

      {/* Search icon */}
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.75a7.25 7.25 0 0 1 5.63 11.819l4.9 4.9a.75.75 0 0 1-.976 1.134l-.084-.073-4.901-4.9A7.25 7.25 0 1 1 10 2.75Zm0 1.5a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5Z" fill="currentColor"/></svg>

      {/* Input field */}
      <input type="search" placeholder="Search.." onKeyDown={(e) => handleSearch(e)}/>

    </div>
  );
};

export default Searchbox;
