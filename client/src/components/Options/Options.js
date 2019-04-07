import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { upKeys, downKeys } from '../../constants/directionalKeys';

export class Options extends Component {
  state = {
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('gameplay').focus();
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key }) => {
    switch (this.state.focusedOption) {
      case 'gameplay': {
        if (downKeys[key]) {
          document.getElementById('display').focus();
        }
        break;
      }
      case 'display': {
        if (upKeys[key]) {
          document.getElementById('gameplay').focus();
        } else if (downKeys[key]) {
          document.getElementById('back').focus();
        }
        break;
      }
      default: {
        if (upKeys[key]) {
          document.getElementById('display').focus();
        }
        break;
      }
    }
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  render() {
    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--settings">
          <h3 className="heading" style={{ color: this.props.textColor }}>Settings</h3>
        </div>

        <div className="menu menu__options menu__options--settings">

          <div className="option__label">

            <div 
              className="option__active option__active--left"
              style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'gameplay' ? 'inline-block' : 'none' }}
            ></div>

            <h2>
              <Link
                to="/settings/gameplay"
                className="router-link option__text"
                id="gameplay"
                style={{ color: this.props.textColor }}
                onFocus={this.handleFocus}
              >
                Gameplay
              </Link>
            </h2>

            <div
              className="option__active option__active--right"
              style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'gameplay' ? 'inline-block' : 'none' }}
            ></div>

          </div>

          <div className="option__label">

            <div
            className="option__active option__active--left"
            style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'display' ? 'inline-block' : 'none' }}
            ></div>
            
            <h2>
              <Link
                to="/settings/display"
                className="router-link option__text"
                id="display"
                style={{ color: this.props.textColor }}
                onFocus={this.handleFocus}
              >
                Display
              </Link>
            </h2>

            <div
              className="option__active option__active--right"
              style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'display' ? 'inline-block' : 'none' }}
            ></div>

          </div>

          <div className="option__label">

            <div
            className="option__active option__active--left"
            style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'back' ? 'inline-block' : 'none' }}
            ></div>

            <h2>
              <Link
                to="/"
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
    )
  }
}

const mapStateToProps = (state) => ({
  textColor: state.colors.text,
  focusColor: state.colors.food
});

export default connect(mapStateToProps)(Options);

