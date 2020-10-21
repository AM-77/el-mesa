import React from 'react';
import PropTypes from 'prop-types';

export default function Writters({ writters, name }) {
  return (
    <div className="writters">
      {writters.length > 0 &&
        writters.filter((writter) => writter !== name).length !== 0 && (
          <p>
            {writters.map((writter, index) => (
              <span key={index}>{writter}</span>
            ))}{' '}
            {writters.length > 1 ? 'are' : 'is'} writting{' '}
            <span className="three-dots">
              <span />
              <span />
              <span />
            </span>{' '}
          </p>
        )}
    </div>
  );
}

Writters.propTypes = {
  name: PropTypes.string.isRequired,
  writters: PropTypes.arrayOf(PropTypes.string).isRequired,
};
