import React, { Component } from 'react'

export default class Writters extends Component {
  render() {
    const { writters, name } = this.props
    return (
      <div className="writters">
          { ( writters.length > 0 && writters.filter(writter => writter !== name).length !== 0 ) && <p>{ writters.map((writter, index) => <span key={index}>{writter}</span>) }{ writters.length > 1 ? 'are' : 'is' } writting... </p> }
      </div>
    )
  }
}
