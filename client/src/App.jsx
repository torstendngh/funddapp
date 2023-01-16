import React from 'react';
import './App.css';
import './global.css';
import Navbar from './components/global/Navbar';
import './assets/fonts/Recursive_VF_1.084.woff2'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/global/Footer';
import CreateProject from './pages/CreateProject';

const App = () => {
  return (
    <div id='app'>
      <Navbar/>
      <div className='page-container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-project' element={<CreateProject/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
