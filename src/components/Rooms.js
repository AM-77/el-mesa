import React from 'react';
import PropTypes from 'prop-types';

export default function Rooms({ rooms, selectRoom, isOpen }) {
  return (
    <div className={`rooms-container ${isOpen && 'open'}`}>
      <h2>Chat Rooms</h2>
      {rooms.length > 0 ? (
        rooms.map((room, index) => (
          <button
            type="button"
            onClick={() => selectRoom(room)}
            key={index}
            className="room btn"
          >
            {room}
          </button>
        ))
      ) : (
        <h5 className="no-room room">No Chat Room</h5>
      )}
    </div>
  );
}

Rooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectRoom: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
