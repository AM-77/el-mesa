import React from 'react';
import PropTypes from 'prop-types';

export default function Members({ members, me }) {
  return (
    <div className="members-container">
      <h2 className="title">The Members</h2>
      <div className="members-list">
        {members.map((member, index) => (
          <h5
            key={index}
            className={`member ${member.name === me ? 'me' : 'others'}`}
          >
            # {member.name}
          </h5>
        ))}
      </div>
    </div>
  );
}

Members.propTypes = {
  me: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
    })
  ).isRequired,
};
