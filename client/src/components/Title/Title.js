import React, { Component } from 'react';
import { connect } from 'react-redux';

import { upKeys, downKeys } from '../../constants/directionalKeys';

import OptionLabel from '../shared/OptionLabel';

export class Title extends Component {
  state = {
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('start').focus();
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  clearScreen = () => {
    const { canvas } = this.props;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  handleKeyDown = ({ key }) => {
    if (downKeys[key] && this.state.focusedOption === 'start') {
      document.getElementById('settings').focus();
    } else if (upKeys[key] && this.state.focusedOption === 'settings') {
      document.getElementById('start').focus();
    }
  }

  render() {
    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--title">
          <h1 style={{ color: this.props.titleColor }}>Snake</h1>
        </div>

        <div className="menu menu__options menu__options--title">

          <OptionLabel
            name="Start"
            id="start"
            link="/game"
            handleFocus={this.handleFocus}
            focusedOption={this.state.focusedOption}
          />

          <OptionLabel
            name="Settings"
            id="settings"
            link="/settings"
            handleFocus={this.handleFocus}
            focusedOption={this.state.focusedOption}
          />

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    titleColor: state.colors.snake,
    focusColor: state.colors.food,
    menuColor: state.colors.text,
    canvas: state.canvas
  };
};

export default connect(mapStateToProps)(Title);
