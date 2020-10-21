import React from 'react';
import PropTypes from 'prop-types';

import logo from '../assets/logo.png';

export default function NavBar(props) {
  const { logout, join, room, toggleNabBar, isOpen } = props;
  return (
    <div className={`nav-bar-container ${join ? 'join' : 'room'}`}>
      <button
        type="button"
        onClick={toggleNabBar}
        className={`nav-btn ${isOpen && 'open'}`}
      >
        <span />
        <span />
        <span />
      </button>
      <div className="logo-wrapper">
        <div className="logo-image">
          <img src={logo} alt="The logo" />
        </div>
        <h1 className="logo-title">{room ? `${room}` : 'El Mesa'}</h1>
      </div>
      {logout && (
        <div className="logout">
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func,
  toggleNabBar: PropTypes.func,
  join: PropTypes.bool,
  isOpen: PropTypes.bool,
  room: PropTypes.string,
};
