export const tileReducer = (state = '', action) => {
  switch (action.type) {
    case 'TILE_SELECTED':
      return { ...state, ...action.payload }

    default:
      return state
  }
}
