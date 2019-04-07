import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { upKeys, downKeys, leftKeys, rightKeys } from '../../../constants/directionalKeys';

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
          <h3 className="heading" style={{ color: this.props.textColor }}>Gameplay</h3>
        </div>

        <div className="menu menu__options menu__options--settings">

          <div className="option" style={{ color: this.props.textColor }}>

            <div className="option__label mb-4">

              <div 
                className="option__active option__active--left"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'wall' ? 'inline-block' : 'none' }}
              ></div>

              <h2
                id="wall"
                onFocus={this.handleFocus}
                tabIndex="0"
              >
                Wall
              </h2>

              <div
                className="option__active option__active--right"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'wall' ? 'inline-block' : 'none' }}
              ></div>

            </div>

            <div className="option__select">

              <div className="option__select--input" style={this.props.isWall ? selectedStyle : {}}>
                On
              </div>

              <div className="option__select--input" style={this.props.isWall ? {} : selectedStyle}>
                Off
              </div>

            </div>

          </div>

          <div className="option" style={{ color: this.props.textColor }}>

            <div className="option__label mb-4">

              <div 
                className="option__active option__active--left"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'speed' ? 'inline-block' : 'none' }}
              ></div>

              <h2
                id="speed"
                onFocus={this.handleFocus}
                tabIndex="0"
              >
                Speed
              </h2>

              <div
                className="option__active option__active--right"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'speed' ? 'inline-block' : 'none' }}
              ></div>

            </div>

            <div className="option__select">

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

          <div className="option" style={{ color: this.props.textColor }}>

            <div className="option__label mb-4">

              <div 
                className="option__active option__active--left"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'back' ? 'inline-block' : 'none' }}
              ></div>

              <h2>
                <Link
                  to="/settings"
                  className="router-link option__text"
                  id="back"
                  style={{ color: this.props.textColor }}
                  onFocus={this.handleFocus}
                >
                  Back
                </Link>
              </h2>

              <div
                className="option__active option__active--right"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'back' ? 'inline-block' : 'none' }}
              ></div>

            </div>

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
