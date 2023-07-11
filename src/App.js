import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <header className="main-container">
        <nav className="navbar">
          <li><Link to="/">Rockets</Link></li>
          <li className="missions"><Link to="/Missions">Missions</Link></li>
          <li><Link to="/Profile">My Profile</Link></li>
        </nav>
        <Routes>
          <Route path="/" element={<Rockets />} />
          <Route path="/Missions" element={<Missions />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </header>
    </Router>
  );
}

export default App;
