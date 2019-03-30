const TOGGLE_WALL = '';

const initialState = {
  highScores: {
    
  },
  isWall: true,
  speed: 2
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case TOGGLE_WALL:
    return { ...state, ...payload }

  default:
    return state
  }
}
