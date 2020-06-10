import React, { Component } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"

import NavBar from "./NavBar"
import Rooms from "./Rooms"

const ENDPOINT = process.env.ENDPOINT || "localhost:3300"

export default class Join extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            room: "",
            rooms: [],
            isOpen: false
        }
    }

    componentDidMount() {
        this.socket = io(ENDPOINT)
        this.socket.emit("get-rooms")
        this.socket.on("rooms", ({ rooms }) => this.setState({ rooms }))
    }

    selectRoom = room => {
        this.setState({room})
    }

    toggleNabBar = () => this.setState((state)=>({isOpen: !state.isOpen}))

    render() {
        const { room, rooms, name, isOpen } = this.state
        const { location: { message } } = this.props

        return (
            <div className="join-container">
                <Rooms rooms={rooms} selectRoom={this.selectRoom} isOpen={isOpen} />
                <div className="join-box">
                    <NavBar join={true} isOpen={isOpen} toggleNabBar={this.toggleNabBar}/>
                    <div className="join-form">
                        <h2>Join a chat room</h2>
                        {
                            message && <div className="error-message">
                                <p>{ message }</p>
                            </div>  
                        }
                        <input type="text"
                            placeholder="Your Name"
                            onChange={e => this.setState({ name: e.target.value })} />
                        <input type="text"
                            placeholder="The Room's Name"
                            onChange={e => this.setState({ room: e.target.value })}
                            value={ room } />
                        <Link onClick={e => (!room || !name) ? e.preventDefault() : null}
                            to={`/${ room }/${ name }`}>
                            <button>join</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
