import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from 'prop-types';

import Message from './Message';

export default function Messages({ messages, me }) {
  return (
    <div className="messages-container">
      <ScrollToBottom className="scroll-to-bottom">
        {messages.map((message, index) => (
          <Message me={me} key={index} msg={message} />
        ))}
      </ScrollToBottom>
    </div>
  );
}

Messages.propTypes = {
  me: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      user: PropTypes.string,
    })
  ).isRequired,
};
