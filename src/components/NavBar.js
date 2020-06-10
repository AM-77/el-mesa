import React, { Component } from "react"
import logo from '../assets/logo.png'

export default class NavBar extends Component {

    render() {
        const { logout, join, room, toggleNabBar, isOpen } = this.props
        return (
            <div className={`nav-bar-container ${join ? 'join': 'room'}`}>
                <div onClick={toggleNabBar} className={`nav-btn ${isOpen && 'open'}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="logo-wrapper">
                    <div className="logo-image"><img src={logo} alt="The logo" /></div>
                    <h1 className="logo-title">{room ? `${room}`: 'El Mesa'}</h1>
                </div>
                {
                    logout && <div className="logout">
                        <button onClick={logout}>Logout</button>
                    </div>
                }
            </div>
        )
    }
}
