import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { GameRunner } from '../../gameLogic/index';

import GameOver from '../GameOver/GameOver';

export class Game extends Component {
  state = {
    game: null,
    isGameOver: false,
    highScores: [],
  }

  componentDidMount() {
    this.props.resetScore();
    const gameRunner = new GameRunner(this.props, this.endGame);

    gameRunner.init();

    this.setState({
      game: gameRunner
    });

    this.getHighScores();
  }

  componentWillUnmount() {
    this.clearScreen();
  }

  getHighScores = () => {
    const params = {
      isWall: this.props.isWall,
      speed: this.props.speed
    }

    axios.get('/highscores', { params }).then(({ data }) => {

      const sortedAscendingHighScores = data.sort((a, b) => {
        if (a.score === b.score) {
          return a.created_at - b.created_at;
        }
        return a.score - b.score;
      });

      this.setState({
        highScores: sortedAscendingHighScores
      });

    });
  }

  endGame = () => {
    this.setState({
      isGameOver: true,
    });

    this.determineHighScore();

    this.props.canvas.classList.add('canvas-gameover');
  }

  playAgain = () => {
    this.clearScreen();

    this.setState({
      isGameOver: false,
    });

    this.props.resetScore();

    this.state.game.init();
  }

  clearScreen = () => {
    this.state.game.clearEndGameLoop();
    this.props.canvas.classList.remove('canvas-gameover');
  }

  determineHighScore = () => {
    const { highScores } = this.state;
    let isHighScore = false;
    let recordIdToDelete = null;
    if (this.props.score === 0) {
      return;
    }

    if (highScores.length < 3) {
      isHighScore = true;
    } else {
      for (let i = 0; i < highScores.length; i++) {
        if (this.props.score > highScores[i].score) {
          isHighScore = true;
          recordIdToDelete = highScores[0]._id;
          console.log('recordIdToDelete', recordIdToDelete);
        }
      }
    }

    if (isHighScore) {
      this.props.setHighScore(recordIdToDelete);
    }
  }

  render() {
    return (
      <div>
        <div className="score">
          Score: {this.props.score}
        </div>

        {this.state.isGameOver && <GameOver isHighScore={this.props.isHighScore} playAgain={this.playAgain} />}

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
  isHighScore: state.isHighScore
});

const mapDispatchToProps = {
  incScore: () => ({ type: 'INCREASE_SCORE', payload: null }),
  resetScore: () => ({ type: 'RESET_SCORE', payload: null }),
  setHighScore: (payload) => ({ type: 'SET_HIGHSCORE', payload })
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
