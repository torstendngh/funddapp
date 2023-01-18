import React from 'react'
import './Searchbox.css'
import { useNavigate } from 'react-router-dom';

const Searchbox = () => {
const navigate = useNavigate();
  
  const handleSearch = (e) => {
    if (e.key === 'Enter'){
      navigate(`/search`, { state: e.target.value })
    }
  }

  return (
    <div className='searchbox'>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_15" data-name="Path 15" d="M10,2.75a7.25,7.25,0,0,1,5.63,11.819l4.9,4.9a.75.75,0,0,1-.976,1.134l-.084-.073-4.9-4.9A7.25,7.25,0,1,1,10,2.75Zm0,1.5A5.75,5.75,0,1,0,15.75,10,5.75,5.75,0,0,0,10,4.25Z" transform="translate(-2.751 -2.75)" fill="currentColor"/>
      </svg>
      <input type="search" placeholder="Search.." onKeyDown={(e) => handleSearch(e)}/>
    </div>
  )
}

export default Searchbox;
