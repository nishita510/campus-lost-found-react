import React from 'react';
import { NavLink } from 'react-router-dom';

// Navbar is a functional component that receives username as a prop
function Navbar({ username }) {
  // Get initials from username
  function getInitials(name) {
    return name
      .split(' ')
      .map(function (word) { return word[0]; })
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <nav className="navbar">
      {/* Brand / Logo */}
      <div className="navbar-brand">
        <div className="navbar-logo">🔍</div>
        <span className="navbar-title">
          Campus <span>L&F</span>
        </span>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={function ({ isActive }) {
              return isActive ? 'active' : '';
            }}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/items"
            className={function ({ isActive }) {
              return isActive ? 'active' : '';
            }}
          >
            Browse Items
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={function ({ isActive }) {
              return isActive ? 'active' : '';
            }}
          >
            Report Item
          </NavLink>
        </li>
      </ul>

      {/* User Info */}
      <div className="navbar-user">
        <div className="user-avatar">{getInitials(username)}</div>
        <span className="user-name">{username}</span>
      </div>
    </nav>
  );
}

export default Navbar;
