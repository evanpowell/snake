const TOGGLE_WALL = 'TOGGLE_WALL';
const CHANGE_SPEED = 'CHANGE_SPEED';
const CHANGE_SPEED = 'CHANGE_SPEED';
const CHANGE_COLORS = 'CHANGE_COLORS';

const initialState = {
  highScores: {
    
  },
  isWall: true,
  speed: 2,
  colors: {
    snake: '#0bdd1d',
    food: '#e00606',
    screen: '#111',
    background: '#111'
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case TOGGLE_WALL:
    return { ...state, isWall: !state.isWall };

  case CHANGE_SPEED:
    return { ...state, ...payload };

  case CHANGE_COLORS:
    return { ...state, colors: { ...this.state.colors, ...payload }};

  default:
    return state;
  }
}
