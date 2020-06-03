import React, { Component } from 'react'

export default class Members extends Component {
    render() {
        return (
            <div className="members-container">
                <h2 className="title">{this.props.room}'s Members</h2>
                {
                    this.props.members.map((member, index) => <h5 key={index} className={`member ${member.name === this.props.me ? "me" : ""}`}><span className="fa fa-user"></span>{member.name}</h5>)
                }
                <div className="logout">
                    <button onClick={this.props.logout}>Logout</button>
                </div>
            </div>
        )
    }
}
