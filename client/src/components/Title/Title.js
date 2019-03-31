import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Title extends Component {
  render() {
    return (
      <div className="text-center">
        <h1 className="title" style={{ color: this.props.titleColor}}>Snake</h1>
        <div className="menu">

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    titleColor: state.colors.snake
  };
};

export default connect(mapStateToProps)(Title);
