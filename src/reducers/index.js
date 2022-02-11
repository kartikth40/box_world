import { combineReducers } from 'redux'
import { keyReducer } from './keyReducer'
import { tileReducer } from './tileReducer'
import { fixedTileReducer } from './fixedTileReducer'

const rootReducer = combineReducers({
  keyPressed: keyReducer,
  tileSelected: tileReducer,
  fixedTiles: fixedTileReducer,
})

export default rootReducer
