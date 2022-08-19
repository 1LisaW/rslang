import React from 'react';
import './navBar.scss';
import {
  Link, Outlet,
} from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item"><Link to="/">MAIN</Link></li>
        <li className="navbar__item"><Link to="/tutorial">TUTORIAL</Link></li>
        <li className="navbar__item"><Link to="/audiocall">AUDIOCALL</Link></li>
        <li className="navbar__item"><Link to="/sprint">SPRINT</Link></li>
        <li className="navbar__item"><Link to="/statistic">STATISTIC</Link></li>
      </ul>
      <Outlet />
    </nav>
  );
}

export default Navbar;
