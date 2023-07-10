import React from 'react';
import Logo from './spacex-logo.png';
import './App.css';

function App() {
  return (
    <header className="App-header">
      <div className="logo-title">
        <img src={Logo} className="App-logo" alt="logo" />
        <h1 className="title">Space Traveler´s Hub</h1>
      </div>

      <nav className="navbar">NAVBAR</nav>

    </header>
  );
}

export default App;
