import React, { Component } from "react"
import io from "socket.io-client"
import { Redirect } from "react-router-dom"


import NavBar from "./NavBar"
import Messages from "./Messages"
import Members from "./Members"
import Writters from './Writters'
import Input from './Input'

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
            writters: [],
            isOpen: false
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

    messageOnChange = message => { this.setState({ message }) }

    messageOnKeyPress = (key) => { (key === "Enter") && this.send() }

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

    toggleNabBar = () => this.setState((state)=>({isOpen: !state.isOpen}))

    render() {

        const { redirect, error, name, room, messages, members, writters, message, isOpen } = this.state

        if (redirect)
            return <Redirect to={{
                pathname: "/",
                message: error
            }} />
        else
            return (
                <div className="room-container">
                    <div className={`room-sidebar ${isOpen && 'open'}`}><Members me={name} members={members} /></div>
                    <div className={`room-content ${isOpen && 'open'}`}>
                        <NavBar logout={this.logout} room={room} isOpen={isOpen} toggleNabBar={this.toggleNabBar} />
                        <div className="chat-messages">
                            <div className="messages"><Messages me={name} messages={messages} /></div>
                            <Writters writters={writters} name={name} />
                            <Input 
                                message={message}
                                send={this.send}
                                isWritting={this.isWritting}
                                stoppedWritting={this.stoppedWritting}
                                messageOnChange={this.messageOnChange}
                                messageOnKeyPress={this.messageOnKeyPress}
                            />
                        </div>
                    </div>
                </div>
            )
    }
}


