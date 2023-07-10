import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/nav.css';

function NAVBAR() {
  return (
    <nav className="navbar">
      <li><NavLink to="/">Rockets</NavLink></li>
      <li><NavLink to="/Mission">Mission</NavLink></li>
      <li><NavLink to="/Profile">Profile</NavLink></li>
    </nav>
  );
}
export default NAVBAR;
