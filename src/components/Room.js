import React, { Component } from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import Messages from './Messages';
import Members from './Members';
import Writters from './Writters';
import Input from './Input';

const ENDPOINT = process.env.ENDPOINT || 'localhost:3300';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      messages: [],
      message: '',
      members: [],
      error: '',
      redirect: false,
      writters: [],
      isOpen: false,
    };
    this.socket = io(ENDPOINT);
  }

  componentDidMount() {
    const {
      match: {
        params: { name, room },
      },
    } = this.props;
    this.setState({ name, room });

    this.socket.emit('join', { name, room }, (error) => {
      if (error) this.setState({ redirect: true, error });
    });

    this.socket.on('message', ({ user, text, members }) => {
      const { messages } = this.state;
      this.setState({ messages: [...messages, { user, text }] });
      if (members) this.setState({ members });
    });

    this.socket.on('writters', ({ writters }) => {
      this.setState({ writters });
    });

    this.socket.emit('get-rooms');
  }

  messageOnChange = (message) => {
    this.setState({ message });
  };

  messageOnKeyPress = (key) => {
    if (key === 'Enter') this.send();
  };

  onImageUpload = (e) => {
    const image = e.target.files[0];
    if (image) this.uploadImage(image, this.sendImage);
  };

  uploadImage = (file, sendImage) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) sendImage(reader.result.toString());
    };
  };

  sendImage = (image) => {
    if (image !== '') {
      this.socket.emit('send-message', image, () => {});
    }
  };

  send = () => {
    const { message } = this.state;
    if (message !== '') {
      this.setState({ message: '' });
      this.socket.emit('send-message', message, () => {});
    }
  };

  isWritting = () => {
    const { room, name } = this.state;
    this.socket.emit('isWritting', { room, name }, () => {});
  };

  stoppedWritting = () => {
    const { room, name } = this.state;
    this.socket.emit('stoppedWritting', { room, name }, () => {});
  };

  logout = () => {
    this.socket.disconnect();
    this.socket.off();
    this.setState({ redirect: true });
  };

  toggleNabBar = () => this.setState((state) => ({ isOpen: !state.isOpen }));

  render() {
    const {
      redirect,
      error,
      name,
      room,
      messages,
      members,
      writters,
      message,
      isOpen,
    } = this.state;

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: '/',
            message: error,
          }}
        />
      );
    return (
      <div className="room-container">
        <div className={`room-sidebar ${isOpen && 'open'}`}>
          <Members me={name} members={members} />
        </div>
        <div className={`room-content ${isOpen && 'open'}`}>
          <NavBar
            logout={this.logout}
            room={room}
            isOpen={isOpen}
            toggleNabBar={this.toggleNabBar}
          />
          <div className="chat-messages">
            <div className="messages">
              <Messages me={name} messages={messages} />
            </div>
            <Writters writters={writters} name={name} />
            <Input
              message={message}
              send={this.send}
              isWritting={this.isWritting}
              stoppedWritting={this.stoppedWritting}
              messageOnChange={this.messageOnChange}
              messageOnKeyPress={this.messageOnKeyPress}
              onImageUpload={this.onImageUpload}
            />
          </div>
        </div>
      </div>
    );
  }
}

Room.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      room: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
