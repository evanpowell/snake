import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class OptionLabel extends Component {
  render() {
    let text;

    if (this.props.link) {
      text = (
        <h2>
          <Link
            to={this.props.link}
            className="router-link option__text"
            id={this.props.id}
            onFocus={this.props.handleFocus}
          >
            {this.props.name}
          </Link>
        </h2>
      );
    } else {
      text = (
        <h2
          tabIndex="0"
          onFocus={this.props.handleFocus}
          id={this.props.id}
        >
          {this.props.name}
        </h2>
      );
    }

    return (
      <div className="option__label">

        <div 
          className="option__active option__active--left"
          style={{ backgroundColor: this.props.focusColor, display: this.props.focusedOption === this.props.id ? 'inline-block' : 'none' }}
        ></div>

        {text}

        <div
          className="option__active option__active--right"
          style={{ backgroundColor: this.props.focusColor, display: this.props.focusedOption === this.props.id ? 'inline-block' : 'none' }}
        ></div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  focusColor: state.colors.food,
  menuColor: state.colors.text,
  ...ownProps
});

export default connect(mapStateToProps)(OptionLabel);
