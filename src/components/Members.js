import React, { Component } from 'react'

export default class Members extends Component {
    render() {
        const { members, me } = this.props
        return (
            <div className="members-container">
                <h2 className="title">The Members</h2>
                <div className="members-list">
                    { members.map((member, index) => <h5 key={index} className={`member ${member.name === me ? "me" : "others"}`}># {member.name}</h5>) }
                </div>
            </div>
        )
    }
}
