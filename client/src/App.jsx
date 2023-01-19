// Modules
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import GetStarted from './pages/GetStarted';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Footer from './components/global/Footer';

// CSS
import './global.css';
import './App.css';

// Fonts
import './assets/fonts/Recursive_VF_1.084.woff2';

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <div className='page-container'>
        <div style={{flex: 1, minHeight: "100vh", height: "100%", display: "flex"}}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/create-project' element={<CreateProject/>}/>
            <Route path='/project-details/:id' element={<ProjectDetails/>}/>
            <Route path='/get-started' element={<GetStarted/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </div>
        
        <Footer/>
      </div>
    </div>
  );
};

export default App;
