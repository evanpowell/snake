import React, { Component } from 'react'
import { connect } from 'react-redux'

export class HighScoreEntry extends Component {

  render() {
    return (
      <div>
        High Score Entry
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HighScoreEntry)
