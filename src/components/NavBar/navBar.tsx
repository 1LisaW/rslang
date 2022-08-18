import React from 'react';
import './navBar.scss';
import {
  Link, Outlet,
} from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li><Link to="/">Main</Link></li>
        <li><Link to="/tutorial">Tutorial</Link></li>
        <li><Link to="/audiocall">Audiocall</Link></li>
        <li><Link to="/sprint">Sprint</Link></li>
        <li><Link to="/statistic">Statistic</Link></li>
      </ul>
      <Outlet />
    </nav>
  );
}

export default Navbar;
