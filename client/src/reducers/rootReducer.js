const TOGGLE_WALL = 'TOGGLE_WALL';
const CHANGE_SPEED = 'CHANGE_SPEED';
const CHANGE_COLORS = 'CHANGE_COLORS';
const UPDATE_CANVAS = 'UPDATE_CANVAS';
const UPDATE_CONTEXT = 'UPDATE_CONTEXT';

const initialState = {
  highScores: {
    
  },
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
  canvas: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case TOGGLE_WALL:
    return { ...state, isWall: !state.isWall };

  case CHANGE_SPEED:
    return { ...state, speed: payload };

  case CHANGE_COLORS:
    return { ...state, colors: { ...this.state.colors, ...payload }};

  case UPDATE_CANVAS:
    return { ...state, canvas: payload };

  case UPDATE_CONTEXT:
    return { ...state, context: payload};

  default:
    return state;
  }
}
