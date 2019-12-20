import React, { Component } from 'react'

export default class Rooms extends Component {
    render() {
        return (
            <div className="rooms-container">
                <h2>Chat Rooms</h2>
                {
                    this.props.rooms.length > 0
                        ?
                        this.props.rooms.map((room, index) => <h5 key={index} className="room">{room}</h5>)
                        :
                        <h5 className="no-room room">No Chat Room</h5>
                }
            </div>
        )
    }
}
