import React, { Component } from "react"
import ReactEmoji from "react-emoji"

export default class Message extends Component {
    render() {

        return (
            <div className="message-container">
                {
                    (this.props.me === this.props.msg.user)
                        ?
                        <div className="the-message me">
                            <div className="message me">
                                <div>
                                    <span className="user">{this.props.msg.user.slice(0, 1).toUpperCase()}</span>
                                </div>
                                <p>{ReactEmoji.emojify(this.props.msg.text)}</p>
                            </div>
                        </div>
                        :
                        (this.props.msg.user === "admin")
                            ?
                            <p className="admin">{ReactEmoji.emojify(this.props.msg.text)}</p>
                            :
                            <div className="the-message others">
                                <div className="message others">
                                    <p>{ReactEmoji.emojify(this.props.msg.text)}</p>
                                    <div>
                                        <span className="user">{this.props.msg.user.slice(0, 1).toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                }

            </div>
        )
    }
}
