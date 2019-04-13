import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import OptionLabel from '../shared/OptionLabel';

export class LeaderBoard extends Component {
  state = {
    highScores: [],
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('back').focus();
    const { isWall, speed } = this.props;
    axios.get('/highscores', { params: { isWall, speed } }).then(({ data }) => {
      const sortedDescendingHighScores = data.sort((a, b) => {
        if (a.score === b.score) {
          return b.created_at - a.created_at;
        }
        return b.score - a.score;
      });
      this.setState({
        highScores: sortedDescendingHighScores
      });
    });
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  render() {
    const highScores = this.state.highScores.map((highScore) => {
      return (
        <div key={highScore._id}>
          <h2 style={{ color: this.props.nameColor }}>{highScore.name}</h2>
          <p style={{ color: this.props.scoreColor }}>{highScore.score}</p>
        </div>
      )
    });
    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--leaderboard">
          <h3 style={{ color: this.props.textColor }}>High Scores</h3>
        </div>

        <div className="menu menu__options menu__options--leaderboard">

          {highScores}

          <OptionLabel
            name="Back"
            link="/"
            id="back"
            handleFocus={this.handleFocus}
            focusedOption={this.state.focusedOption}
          />

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isWall: state.isWall,
  speed: state.speed,
  textColor: state.colors.text,
  nameColor: state.colors.snake,
  scoreColor: state.colors.food
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
