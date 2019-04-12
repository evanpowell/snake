import React, { Component } from 'react';
import { connect } from 'react-redux';

import { upKeys, downKeys } from '../../constants/directionalKeys';

import OptionLabel from '../shared/OptionLabel';

export class GameOver extends Component {
  state = {
    focusedOption: null
  };

  componentDidMount() {
    document.getElementById('play-again').focus();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isHighScore !== this.props.isHighScore) {
      document.getElementById('highscore-entry').focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  handleKeyDown = ({ key }) => {
    switch (this.state.focusedOption) {
      case 'highscore-entry': {
        if (downKeys[key]) {
          document.getElementById('play-again').focus();
        }
        break;
      }
      case 'play-again': {
        if (downKeys[key]) {
          document.getElementById('back').focus();
        } else if (this.props.isHighScore && upKeys[key]) {
          document.getElementById('highscore-entry').focus();
        }
        break;
      }
      default: {
        if (upKeys[key]) {
          document.getElementById('play-again').focus();
        }
      }
    }
  }

  render() {
    let title = null;
    if (this.props.isHighScore) {
      title = <h1 className="high-score" style={{ color: this.props.snakeColor }}>High Score</h1>
    } else {
      title = <h1 style={{ color: this.props.titleColor }}>Game Over</h1>
    }

    const highScoreOption = (
      <OptionLabel
        name="Enter Your Name"
        id="highscore-entry"
        link="/highscore-entry"
        handleFocus={this.handleFocus}
        focusedOption={this.state.focusedOption}
      />
    )

    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--title">
          { title }
        </div>

        <div className="menu menu__options menu__options--title endgame-options">

          { this.props.isHighScore && highScoreOption }

          <OptionLabel
            name="Play Again"
            id="play-again"
            handleSelect={this.props.playAgain}
            handleFocus={this.handleFocus}
            focusedOption={this.state.focusedOption}
          />

          <OptionLabel
            name="Back"
            id="back"
            link="/"
            handleFocus={this.handleFocus}
            focusedOption={this.state.focusedOption}
          />

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  titleColor: state.colors.food,
  screenColor: state.colors.screen,
  snakeColor: state.colors.snake,
  ...ownProps
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)

