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
      <div className="text-center">

        <h1 className="title" style={{ color: this.props.titleColor }}>Snake</h1>

        <div className="option mb-5">

          <div 
            className="option__active option__active--left"
            style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'start' ? 'inline-block' : 'none' }}
          ></div>

          <h2>
            <Link
              to="/game"
              className="title--menu option__text"
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

        <div className="option">

          <div
          className="option__active option__active--left"
          style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'settings' ? 'inline-block' : 'none' }}
          ></div>
          
          <h2>
            <Link
              to="/settings"
              className="title--menu option__text"
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
