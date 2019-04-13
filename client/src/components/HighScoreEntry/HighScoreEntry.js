import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

export class HighScoreEntry extends Component {
  state = {
    name: ''
  }

  componentDidMount() {
    document.getElementById('highscore-input').focus();
  }

  handleInputChange = () => {
    this.setState({
      name: event.target.value.toUpperCase()
    });
  }

  handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      this.inputHighScore();
    }
  }

  handleFocus = (event) => {
    const input = document.getElementById('highscore-input');
    if (event.target === input) {
      input.removeAttribute('readonly');
    }
  }

  inputHighScore = () => {
    const { name } = this.state;
    const { isWall, speed, highScoreToDeleteId, score } = this.props;

    console.log('highscore to delete id:', highScoreToDeleteId);

    if (!name.length) {
      return;
    }

    if (highScoreToDeleteId) {
      const options = {
        params: {
          id: highScoreToDeleteId
        }
      };
      axios.delete('/highscore', options).then(() => {
        return axios.post('/highscore', { name, isWall, speed, score });
      }).then(() => {
        this.props.history.push('/leaderboard');
      });
    } else {
      axios.post('/highscore', { name, isWall, speed, score }).then(() => {
        this.props.history.push('/leaderboard');
      });
    }
  }

  render() {
    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--highscore-entry">
          <h1 style={{ color: this.props.titleColor }}>Congratulations!</h1>
        </div>

        <div className="menu menu__options menu__options--highscore-entry">

          <div className="input-div">

            <label htmlFor="name">Enter your name below</label>

            <input
              id="highscore-input"
              className="highscore-input"
              type="text"
              maxLength="15"
              spellCheck="false"
              style={{ color: this.props.titleColor }}
              onChange={this.handleInputChange}
              value={this.state.name}
              onKeyDown={this.handleKeyDown}
              onFocus={this.handleFocus}
              readonly
            />

          </div>

        </div>

      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  titleColor: state.colors.snake,
  score: state.score,
  isWall: state.isWall,
  speed: state.speed,
  highScoreToDeleteId: state.highScoreToDeleteId,
  ...ownProps
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HighScoreEntry));