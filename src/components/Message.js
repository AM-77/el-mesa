import React, { Component } from "react"
import ReactEmoji from "react-emoji"

export default class Message extends Component {
    render() {
        const { me, msg: { text, user} } = this.props 
        
        let message
        if ( user !== "admin" && text.indexOf('data:image/') === -1 ) {
            message =  <p className="content">{ReactEmoji.emojify(text)}</p>
        }else {
            message = <img className="image" src={text} alt="recieved image" />
        }

        return (
            <div className="message-container">
                {
                    (user === "admin")
                        ?
                        <p className="admin">{ReactEmoji.emojify(text)}</p>
                        :
                        <div className={`message ${(me === user) ? 'me' : 'others' }`}>
                            <span className="user">{ (me === user) ? user.slice(0, 1).toUpperCase() : user }</span>
                            { message }
                        </div>
                }
            </div>
        )
    }
}
