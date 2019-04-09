import React, { Component } from 'react';
import { connect } from 'react-redux';

import { upKeys, downKeys, leftKeys, rightKeys } from '../../constants/directionalKeys';

export class Game extends Component {
  state = {

  }

  componentWillMount() {
    
  }

  startGame = () => {
    this.props.resetScore();

  }

  fillScreen = () => {
    this.props.ctx.fillStyle = this.props.screenColor;
    this.props.ctx.fill(0, 0, this.props.fullLength, this.props.fullLength);
  }

  renderBlock = ({ x, y, width, height }, color) => {
    this.props.ctx.fillStyle = color;
    this.props.ctx.fillRect
  }

  checkBlock = (x1, y1, x2, y2) => {
    return x1 === x2 && y1 === y2
  }

  render() {
    return (
      <div>
        Game Component
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isWall: state.isWall,
  speed: state.speed,
  score: state.score,
  snakeColor: state.colors.snake,
  screenColor: state.colors.screen,
  foodColor: state.colors.food,
  canvas: state.canvas,
})

const mapDispatchToProps = {
  incScore: () => ({ type: 'INCREASE_SCORE', payload: null }),
  resetScore: () => ({ type: 'RESET_SCORE', payload: null })
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
