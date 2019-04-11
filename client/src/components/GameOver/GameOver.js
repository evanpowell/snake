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
      case 'play-again': {
        if (downKeys[key]) {
          document.getElementById('back').focus();
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
    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--title">
          <h1 style={{ color: this.props.titleColor }}>Game Over</h1>
        </div>

        <div className="menu menu__options menu__options--title">

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
  ...ownProps
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver)

