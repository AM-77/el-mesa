import React, { Component } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"

import NavBar from "./NavBar"
import Rooms from "./Rooms"

let socket
const ENDPOINT = "localhost:3300"

export default class Join extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            room: "",
            rooms: []
        }
        socket = io(ENDPOINT)
        socket.emit("get-rooms")
        socket.on("rooms", ({ rooms }) => this.setState({ rooms }))
    }

    render() {
        return (
            <div className="join-container">
                {
                    this.props.location.message
                        ?
                        <div className="error-box">
                            <p>{this.props.location.message}</p>
                        </div>
                        :
                        null
                }

                <NavBar is_join />
                <div className="rooms-box">
                    <Rooms rooms={this.state.rooms} />
                </div>
                <div className="join-box">
                    <h2>Join A Chat Room</h2>
                    <input type="text"
                        placeholder="Your Name"
                        onChange={e => this.setState({ name: e.target.value })} />
                    <input type="text"
                        placeholder="The Room's Name"
                        onChange={e => this.setState({ room: e.target.value })} />
                    <Link onClick={e => (!this.state.room || !this.state.name) ? e.preventDefault() : null}
                        to={`/${this.state.room}/${this.state.name}`}>
                        <button>join</button>
                    </Link>
                </div>
            </div>
        )
    }
}
