import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { upKeys, downKeys, leftKeys, rightKeys } from '../../../constants/directionalKeys';
import { colorSchemes } from '../../../constants/colorSchemes';

export class Display extends Component {
  state = {
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('color-scheme').focus();
    document.body.addEventListener('keydown', this.handleKeydown);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.screenColor !== this.props.screenColor) {
      this.updateScreenColor();
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = ({ key }) => {
    switch (this.state.focusedOption) {
      case 'color-scheme': {
        if (this.props.colorScheme === 'normal' && rightKeys[key]) {
          this.props.updateColorScheme(colorSchemes.gameboy);
        } else if (this.props.colorScheme === 'gameboy') {
          if (leftKeys[key]) {
            this.props.updateColorScheme(colorSchemes.normal);
          }
        }
        break;
      }
      default: {
        if (upKeys[key]) {
          document.getElementById('color-scheme').focus();
        }
      }
    }
  }

  handleFocus = (event) => {
    this.setState({
      focusedOption: event.target.id
    });
  }

  updateScreenColor = () => {
    let ctx = this.props.canvas.getContext('2d');
    ctx.fillStyle = this.props.screenColor;
    ctx.fillRect(0, 0, this.props.canvas.width, this.props.canvas.height);
  }

  render() {
    let selectedStyle = {
      backgroundColor: this.props.textColor,
      color: this.props.screenColor
    }

    return (
      <div className="text-center h-100">

        <div className="menu menu__heading menu__heading--settings">
          <h3 className="heading" style={{ color: this.props.textColor }}>Display</h3>
        </div>

        <div className="menu menu__options menu__options--settings">

          <div className="option" style={{ color: this.props.textColor }}>

            <div className="option__label mb-4">

              <div 
                className="option__active option__active--left"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'color-scheme' ? 'inline-block' : 'none' }}
              ></div>

              <h2
                id="color-scheme"
                onFocus={this.handleFocus}
                tabIndex="0"
              >
                Color Scheme
              </h2>

              <div
                className="option__active option__active--right"
                style={{ backgroundColor: this.props.focusColor, display: this.state.focusedOption === 'color-scheme' ? 'inline-block' : 'none' }}
              ></div>

            </div>

            <div className="option__select">

              <div className="option__select--input" style={this.props.colorScheme === 'normal' ? selectedStyle : {}}>
                Normal
              </div>

              <div className="option__select--input" style={this.props.colorScheme === 'gameboy' ? selectedStyle : {}}>
                GameBoy
              </div>

            </div>

          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  colorScheme: state.colorScheme,
  screenColor: state.colors.screen,
  textColor: state.colors.text,
  focusColor: state.colors.food,
  canvas: state.canvas
});

const mapDispatchToProps = {
  updateColorScheme: (colorScheme) => {
    return {
      type: 'CHANGE_COLORS',
      payload: colorScheme
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
