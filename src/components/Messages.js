import React, { Component } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"

export default class Messages extends Component {
    render() {
        return (
            <div className="messages-container">
                <ScrollToBottom className="scroll-to-bottom">
                    {this.props.messages.map((message, index) => <Message me={this.props.me} key={index} msg={message} />)}
                </ScrollToBottom>
            </div>
        )
    }
}
