import React, { Component } from "react"
import io from "socket.io-client"
import { Redirect } from "react-router-dom"

import NavBar from "./NavBar"
import Messages from "./Messages"
import Members from "./Members"

const ENDPOINT = process.env.ENDPOINT || "localhost:3300"


export default class Room extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            room: "",
            messages: [],
            message: "",
            members: [],
            error: "",
            redirect: false,
            writters: []
        }
        this.socket = io(ENDPOINT)
    }

    componentDidMount() {
        const { name, room } = this.props.match.params
        this.setState({ name, room })

        this.socket.emit("join", { name, room }, (error) => {
            if (error)
                this.setState({ redirect: true, error })
        })

        this.socket.on("message", ({ user, text, members }) => {
            this.setState({ messages: [...this.state.messages, { user, text }] })
            if (members)
                this.setState({ members })
        })

        this.socket.on("writters", ({ writters }) => {
            this.setState({ writters })
        })

        this.socket.emit("get-rooms")
    }

    messageOnChange = (e) => {
        this.setState({ message: e.target.value })
    }

    messageOnKeyPress = (e) => {
        if (e.key === "Enter") {
            this.send()
        }
    }

    send = () => {
        let { message } = this.state
        if (message !== "") {
            this.setState({ message: "" })
            this.socket.emit("send-message", message, () => { })
        }
    }

    isWritting = () => {
        this.socket.emit("isWritting", { room: this.state.room, name: this.state.name }, () => { })
    }

    stoppedWritting = () => {
        this.socket.emit("stoppedWritting", { room: this.state.room, name: this.state.name }, () => { })
    }

    logout = () => {
        this.socket.disconnect()
        this.socket.off()
        this.setState({ redirect: true })
    }

    render() {

        const { redirect, error, name, room, messages, members, writters, message } = this.state

        if (redirect)
            return <Redirect to={{
                pathname: "/",
                message: error
            }} />
        else
            return (
                <div className="room-container">
                    <div className="room-sidebar"><Members me={name} members={members} room={room} /></div>
                    <div className="room-content">
                        <NavBar logout={this.logout} room={room}/>
                        <div className="chat-messages">
                            <div className="messages"><Messages me={name} messages={messages} /></div>
                            {
                                writters.length > 0 && writters.filter(name => name !== name).length !== 0
                                    ?
                                    writters.length > 1 ?
                                        <div className="writters">
                                            <p>{writters.map((writter, index) => <span key={index}>{writter} </span>)} are writting... </p>
                                        </div>
                                        :
                                        <div className="writters">
                                            <p>{writters.map((writter, index) => <span key={index}>{writter}</span>)} is writting... </p>
                                        </div>
                                    :
                                    null
                            }
                            <div className="sending-box">
                                <input type="text" value={message}
                                    placeholder="Your Message"
                                    onChange={(e) => this.messageOnChange(e)}
                                    onKeyPress={(e) => this.messageOnKeyPress(e)}
                                    onFocus={this.isWritting}
                                    onBlur={this.stoppedWritting} />
                                <button onClick={this.send}>send</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}


// {
//     ( writters.length > 0 && writters.filter(name => name !== name).length !== 0 ) && <div className="writters">
//         <p>{ writters.map((writter, index) => <span key={index}>{writter}</span>) }{ writters.length > 1 ? 'are' : 'is' } writting... </p>
//     </div>
// }