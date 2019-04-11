import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { GameRunner } from '../../gameLogic/index';

import GameOver from '../GameOver/GameOver';

export class Game extends Component {
  state = {
    game: null,
    isGameOver: false,
    isHighScore: false,
    highScores: []
  }

  componentDidMount() {
    const gameRunner = new GameRunner(this.props, this.endGame);

    gameRunner.init();

    this.setState({
      game: gameRunner
    });

    this.getHighScores();
  }

  componentWillUnmount() {
    this.clearScreen();
    this.props.resetScore();
  }

  getHighScores = () => {
    // const params = {
    //   isWall: this.props.isWall,
    //   speed: this.props.speed
    // }

    // axios.get('/highscores', { params }).then(({ data }) => {
    //   this.setState({
    //     highScores: data
    //   });
    // });
  }

  endGame = () => {
    this.setState({
      isGameOver: true,
      isHighScore: this.isHighScore()
    });
  }

  playAgain = () => {
    this.clearScreen();

    this.setState({
      isGameOver: false,
      isHighScore: false,
    });

    this.props.resetScore();

    this.state.game.init();
  }

  clearScreen = () => {
    this.state.game.clearEndGameLoop();
  }

  isHighScore = () => {
    // compare highscore with leaderboard
    return false;
  }

  render() {
    let endGameComponent = null;
    if (this.state.isGameOver) {
      endGameComponent = this.state.isHighScore ? null : (<GameOver playAgain={this.playAgain} />);
    }

    return (
      <div>
        <div className="score">
          Score: {this.props.score}
        </div>

        {endGameComponent}
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
