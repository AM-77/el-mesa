import React, { Component } from "react"
import io from "socket.io-client"
import { Redirect } from "react-router-dom"

import NavBar from "./NavBar"
import Messages from "./Messages"
import Members from "./Members"

const ENDPOINT = process.env.ENDPOINT || "localhost:3300"
let socket

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
            redirect: false
        }
        socket = io(ENDPOINT)
    }

    componentDidMount() {
        let name = this.props.match.params.name
        let room = this.props.match.params.room
        this.setState({ name, room })

        socket.emit("join", { name, room }, (error) => {
            if (error)
                this.setState({ redirect: true, error })
        })

        socket.on("message", ({ user, text, members }) => {
            this.setState({ messages: [...this.state.messages, { user, text }] })
            if (members)
                this.setState({ members })
        })

        socket.emit("get-rooms")
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
        let message = this.state.message
        if (message !== "") {
            this.setState({ message: "" })
            socket.emit("send-message", message, () => { })
        }
    }

    logout = () => {
        socket.disconnect()
        socket.off()
        this.setState({ redirect: true, error: "Logged Out" })
    }

    render() {
        if (this.state.redirect)
            return <Redirect to={{
                pathname: "/",
                message: this.state.error
            }} />
        else
            return (
                <div className="room-container">
                    <div className="nav-bar">
                        <NavBar />
                    </div>
                    <div className="chat-members">
                        <Members me={this.state.name} members={this.state.members} room={this.state.room} logout={this.logout} />
                    </div>
                    <div className="chat-messages">
                        <div className="messages">
                            <Messages me={this.state.name} messages={this.state.messages} />
                        </div>
                        <div className="sending-box">
                            <input type="text" value={this.state.message}
                                placeholder="Your Message"
                                onChange={(e) => this.messageOnChange(e)}
                                onKeyPress={(e) => this.messageOnKeyPress(e)} />
                            <button onClick={this.send}>send</button>
                        </div>
                    </div>
                </div>
            )
    }
}
