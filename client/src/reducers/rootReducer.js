const TOGGLE_WALL = 'TOGGLE_WALL';
const CHANGE_SPEED = 'CHANGE_SPEED';
const CHANGE_COLORS = 'CHANGE_COLORS';
const UPDATE_CANVAS = 'UPDATE_CANVAS';
const INCREASE_SCORE = 'INCREASE_SCORE';
const RESET_SCORE = 'RESET_SCORE';
const SET_HIGHSCORE = 'SET_HIGHSCORE';

const initialState = {
  isWall: true,
  speed: 2,
  colors: {
    snake: '#0bdd1d',
    food: '#e00606',
    text: '#cecece',
    screen: '#111',
    wall: '#cecece',
    background: '#111'
  },
  colorScheme: 'normal',
  canvas: null,
  context: null,
  score: 0,
  isHighScore: false,
  highScoreToDeleteId: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case TOGGLE_WALL:
    return { ...state, isWall: !state.isWall };

  case CHANGE_SPEED:
    return { ...state, speed: payload };

  case CHANGE_COLORS:
    return { ...state, ...payload};

  case UPDATE_CANVAS:
    return { ...state, canvas: payload };

  case INCREASE_SCORE:
    return { ...state, score: state.score + 1};

  case RESET_SCORE:
    return { ...state, score: 0, isHighScore:false, highScoreToDeleteId: null };

  case SET_HIGHSCORE:
    return { ...state, isHighScore: true, highScoreToDeleteId: payload };

  default:
    return state;
  }
}
