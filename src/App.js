import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Logo from './spacex-logo.png';
import './App.css';
import NAVBAR from './components/Navbar';
import Profile from './components/Profile';
import Rockets from './components/Rockets';
import Mission from './components/Mission';

function App() {
  return (
    <>
      <header className="App-header">
        <div className="logo-title">
          <img src={Logo} className="App-logo" alt="logo" />
          <h1 className="title">Space Traveler´s Hub</h1>
        </div>
        <NAVBAR />
      </header>
      <Routes>
        <Route path="/" element={<Rockets />} />
        <Route path="/Mission" element={<Mission />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>

  );
}

export default App;
