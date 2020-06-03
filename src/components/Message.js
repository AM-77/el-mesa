import React, { Component } from "react"
import ReactEmoji from "react-emoji"

export default class Message extends Component {
    render() {
        const { me, msg: { text, user} } = this.props 
        return (
            <div className="message-container">
                {
                    (user === "admin")
                        ?
                        <p className="admin">{ReactEmoji.emojify(text)}</p>
                        :
                        <div className={`message ${(me === user) ? 'me' : 'others' }`}>
                            <span className="user">{ (me === user) ? user.slice(0, 1).toUpperCase() : user }</span>
                            <p className="content">{ReactEmoji.emojify(text)}</p>
                        </div>
                }
            </div>
        )
    }
}
