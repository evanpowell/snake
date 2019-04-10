import React, { Component } from 'react';
import { connect } from 'react-redux';

import { upKeys, downKeys } from '../../constants/directionalKeys';

import OptionLabel from '../shared/OptionLabel';

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

          <OptionLabel name="Gameplay" id="gameplay" link="/settings/gameplay" handleFocus={this.handleFocus} focusedOption={this.state.focusedOption} />
          
          <OptionLabel name="Display" id="display" link="/settings/display" handleFocus={this.handleFocus} focusedOption={this.state.focusedOption} />
          
          <OptionLabel name="Back" id="back" link="/" handleFocus={this.handleFocus} focusedOption={this.state.focusedOption} />

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

