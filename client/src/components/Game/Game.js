import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GameRunner } from '../../gameLogic/index';

export class Game extends Component {
  state = {

  }

  componentDidMount() {
    const gameRunner = new GameRunner(this.props, () => {
      console.log('endgame loop first iteration over');
    });
    gameRunner.init();
  }

  isHighScore = () => {

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
  textColor: state.colors.text,
  foodColor: state.colors.food,
  canvas: state.canvas,
});

const mapDispatchToProps = {
  incScore: () => ({ type: 'INCREASE_SCORE', payload: null }),
  resetScore: () => ({ type: 'RESET_SCORE', payload: null })
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
