import React from 'react';
import './App.css';
import './global.css';
import Navbar from './components/navbar/Navbar';
import './assets/fonts/Recursive_VF_1.084.woff2'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/global/Footer';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import GetStarted from './pages/GetStarted';
import Profile from './pages/Profile';

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
          </Routes>
        </div>
        
        <Footer/>
      </div>
    </div>
  );
};

export default App;
