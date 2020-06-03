import React, { Component } from "react"

export default class NavBar extends Component {
    render() {
        return (
            <div className="nav-bar-container">
                {
                    <div className="join-nav-bar">
                        <div className="center">
                            <div><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="El kara's logo" /></div>
                            <h1 className="title">El Kara</h1>
                        </div>
                    </div>
                }

            </div>
        )
    }
}
