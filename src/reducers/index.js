import { combineReducers } from 'redux'
import { keyReducer } from './keyReducer'
import { tileReducer } from './tileReducer'

const rootReducer = combineReducers({
  keyPressed: keyReducer,
  tileSelected: tileReducer,
})

export default rootReducer
