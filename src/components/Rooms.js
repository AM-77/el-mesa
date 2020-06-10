import React, { Component } from 'react'

export default class Rooms extends Component {
    render() {
        const { rooms, selectRoom, isOpen } = this.props
        return (
            <div className={`rooms-container ${isOpen && 'open'}`}>
                <h2>Chat Rooms</h2>
                {
                    rooms.length > 0 ?
                        rooms.map((room, index) => <h5 onClick={() => selectRoom(room)} key={index} className="room">{room}</h5>)
                        :
                        <h5 className="no-room room">No Chat Room</h5>
                }
            </div>
        )
    }
}
