import { fixedTiles } from '../assets/tilesDataManipulators'

let initialTilesState = fixedTiles()

export const fixedTileReducer = (
  state = { tiles: initialTilesState },
  action
) => {
  switch (action.type) {
    case 'SET_TILES':
      return { ...state, ...action.payload }

    default:
      return state
  }
}
