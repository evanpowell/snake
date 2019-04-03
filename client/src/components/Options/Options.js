import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Options extends Component {
  state = {
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('gameplay').focus();
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  render() {
    return (
      <div className="text-center">

        <h3 className="heading mb-5" style={{ color: this.props.textColor }}>Settings</h3>

        <div className="option mb-5">

          <div 
            className="option__active option__active--left"
            style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'gameplay' ? 'inline-block' : 'none' }}
          ></div>

          <h2>
            <Link
              to="/settings/gameplay"
              className="title--menu option__text"
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

        <div className="option mb-5">

          <div
          className="option__active option__active--left"
          style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'display' ? 'inline-block' : 'none' }}
          ></div>
          
          <h2>
            <Link
              to="/settings/display"
              className="title--menu option__text"
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

        <div className="option">

          <div
          className="option__active option__active--left"
          style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'back' ? 'inline-block' : 'none' }}
          ></div>

          <h2>
            <Link
              to="/"
              className="title--menu option__text"
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
    )
  }
}

const mapStateToProps = (state) => ({
  textColor: state.colors.text,
  focusColor: state.colors.food
});

export default connect(mapStateToProps)(Options);

