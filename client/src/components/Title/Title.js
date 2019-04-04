import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Title extends Component {
  state = {
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('start').focus();
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  render() {
    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--title">
          <h1 style={{ color: this.props.titleColor }}>Snake</h1>
        </div>

        <div className="menu menu__options menu__options--title">

          <div className="option__label">

            <div 
              className="option__active option__active--left"
              style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'start' ? 'inline-block' : 'none' }}
            ></div>

            <h2>
              <Link
                to="/game"
                className="router-link option__text"
                id="start"
                style={{ color: this.props.menuColor }}
                onFocus={this.handleFocus}
              >
                Start
              </Link>
            </h2>

            <div
              className="option__active option__active--right"
              style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'start' ? 'inline-block' : 'none' }}
            ></div>

          </div>

          <div className="option__label">

            <div
              className="option__active option__active--left"
              style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'settings' ? 'inline-block' : 'none' }}
            ></div>
            
            <h2>
              <Link
                to="/settings"
                className="router-link option__text"
                id="settings"
                style={{ color: this.props.menuColor }}
                onFocus={this.handleFocus}
              >
                Settings
              </Link>
            </h2>

            <div
              className="option__active option__active--right"
              style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'settings' ? 'inline-block' : 'none' }}
            ></div>

          </div>

        </div>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    titleColor: state.colors.snake,
    focusColor: state.colors.food,
    menuColor: state.colors.text
  };
};

export default connect(mapStateToProps)(Title);
