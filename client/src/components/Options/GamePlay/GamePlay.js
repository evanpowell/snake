import React, { Component } from 'react';
import { connect } from 'react-redux';

import { upKeys, downKeys, leftKeys, rightKeys } from '../../../constants/directionalKeys';

import OptionLabel from '../../shared/OptionLabel';

export class Gameplay extends Component {
  state = {
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('wall').focus();
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key }) => {
    switch (this.state.focusedOption) {
      case 'wall': {
        if (this.props.isWall && rightKeys[key]) {
          this.props.toggleWall();
        } else if (!this.props.isWall && leftKeys[key]) {
          this.props.toggleWall();
        } else if (downKeys[key]) {
          document.getElementById('speed').focus();
        }
        break;
      }
      case 'speed': {
        if (rightKeys[key] && this.props.speed < 3) {
          this.props.changeSpeed(this.props.speed + 1);
        } else if (leftKeys[key] && this.props.speed > 1) {
          this.props.changeSpeed(this.props.speed - 1);
        } else if (upKeys[key]) {
          document.getElementById('wall').focus();
        } else if (downKeys[key]) {
          document.getElementById('back').focus();
        }
        break;
      }
      default: {
        if (upKeys[key]) {
          document.getElementById('speed').focus();
        }
      }
    }
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  render() {
    let selectedStyle = {
      backgroundColor: this.props.textColor,
      color: this.props.screenColor
    }

    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--settings">
          <h3 className="heading">Gameplay</h3>
        </div>

        <div className="menu menu__options menu__options--settings">

          <div className="option">

            <OptionLabel
              name="Wall"
              id="wall"
              handleFocus={this.handleFocus}
              focusedOption={this.state.focusedOption}
            />

            <div className="option__select mt-4">

              <div className="option__select--input" style={this.props.isWall ? selectedStyle : {}}>
                On
              </div>

              <div className="option__select--input" style={this.props.isWall ? {} : selectedStyle}>
                Off
              </div>

            </div>

          </div>

          <div className="option">

            <OptionLabel
              name="Speed"
              id="speed"
              handleFocus={this.handleFocus}
              focusedOption={this.state.focusedOption}
            />

            <div className="option__select mt-4">

              <div className="option__select--input" style={this.props.speed === 1 ? selectedStyle : {}}>
                Slow
              </div>

              <div className="option__select--input" style={this.props.speed === 2 ? selectedStyle : {}}>
                Normal
              </div>

              <div className="option__select--input" style={this.props.speed === 3 ? selectedStyle : {}}>
                Fast
              </div>

            </div>

          </div>

          <div className="option">

            <OptionLabel
              name="Back"
              id="back"
              link="/settings"
              handleFocus={this.handleFocus}
              focusedOption={this.state.focusedOption}
            />
            
          </div>

        </div>

      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  textColor: state.colors.text,
  focusColor: state.colors.food,
  screenColor: state.colors.screen,
  isWall: state.isWall,
  speed: state.speed
});

const mapDispatchToProps = {
  toggleWall: () => {
    return {
      type: 'TOGGLE_WALL',
      payload: null
    };
  },
  changeSpeed: (speed) => {
    return {
      type: 'CHANGE_SPEED',
      payload: speed
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
