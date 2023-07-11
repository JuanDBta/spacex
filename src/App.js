import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Profile from './components/Profile';
import './App.css';
import Logo from './spacex-logo.png';

function App() {
  return (
    <Router>
      <header className="App-header">

        <div className="logo-title">
          <img src={Logo} className="App-logo" alt="logo" />
          <h1 className="title">Space Traveler´s Hub</h1>
        </div>

        <nav className="navbar">
          <li><Link to="/">Rockets</Link></li>
          <li className="missions"><Link to="/Missions">Missions</Link></li>
          <li><Link to="/Profile">My Profile</Link></li>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Rockets />} />
        <Route path="/Missions" element={<Missions />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>

    </Router>
  );
}

export default App;
