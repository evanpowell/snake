import React, { Component } from 'react';
import { connect } from 'react-redux';

import { upKeys, downKeys, leftKeys, rightKeys } from '../../../constants/directionalKeys';
import { colorSchemes } from '../../../constants/colorSchemes';

import OptionLabel from '../../shared/OptionLabel';

export class Display extends Component {
  state = {
    focusedOption: null
  }

  componentDidMount() {
    document.getElementById('color-scheme').focus();
    document.body.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = ({ key }) => {
    switch (this.state.focusedOption) {
      case 'color-scheme': {
        if (rightKeys[key]) {
          if (this.props.colorScheme === 'normal') {
            this.props.updateColorScheme(colorSchemes.gameboy);
          }
        } else if (leftKeys[key]) {
          if (this.props.colorScheme === 'gameboy') {
            this.props.updateColorScheme(colorSchemes.normal);
          }
        } else if (downKeys[key]) {
          document.getElementById('back').focus();
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

            <OptionLabel
              name="Color Scheme"
              id="color-scheme"
              handleFocus={this.handleFocus}
              focusedOption={this.state.focusedOption}
            />

            <div className="option__select mt-4">

              <div className="option__select--input" style={this.props.colorScheme === 'normal' ? selectedStyle : {}}>
                Normal
              </div>

              <div className="option__select--input" style={this.props.colorScheme === 'gameboy' ? selectedStyle : {}}>
                GameBoy
              </div>

            </div>

          </div>

          <div className="option" style={{ color: this.props.textColor }}>

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
}

const mapStateToProps = (state) => ({
  colorScheme: state.colorScheme,
  screenColor: state.colors.screen,
  textColor: state.colors.text,
  focusColor: state.colors.food,
  fullLength: state.canvas.width,
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
