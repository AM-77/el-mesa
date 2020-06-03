import React, { Component } from 'react'
// import 'emoji-mart/css/emoji-mart.css'
// import { Picker, Emoji } from 'emoji-mart'

export default class Input extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hideEmojis: true
    }
  }

  toggleEmojis = () => {
    this.setState((state) => ({
      hideEmojis: !state.hideEmojis
    }))
  }

  render() {
    const { message, send, isWritting, stoppedWritting, messageOnChange, messageOnKeyPress } = this.props
    // const { hideEmojis } = this.state
    return (
      <div className="sending-box">
          {/* <div className={`emojis ${hideEmojis && 'hide'}`}>
            <Picker set={'facebook'} onSelect={emoji =>  messageOnChange(message + emoji.emoticons[0])} showPreview={false} showSkinTones={false} useButton={false} />
          </div> */}
          <input 
              type="text" 
              value={message}
              placeholder="Your Message"
              onChange={(e) => messageOnChange(e.target.value)}
              onKeyPress={(e) => messageOnKeyPress(e.key)}
              onFocus={isWritting}
              onBlur={stoppedWritting} />
          
          {/* <button className="emoji" onClick={this.toggleEmojis}><Emoji set={'facebook'} emoji={'smile'} size={24} /></button> */}
          <button className="send" onClick={send}>send</button>
      </div>
    )
  }
}
