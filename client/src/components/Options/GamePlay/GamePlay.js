import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      case 'wall' : {

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

              <div className="option__select--input" style={this.props.isWall && selectedStyle}>
                On
              </div>

              <div className="option__select--input">
                Off
              </div>

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

}

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
