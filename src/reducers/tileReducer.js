export const tileReducer = (state = { tile: -1 }, action) => {
  switch (action.type) {
    case 'TILE_SELECTED':
      return { ...state, ...action.payload }

    default:
      return state
  }
}
