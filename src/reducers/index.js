import { combineReducers } from 'redux'
import { keyReducer } from './keyReducer'

const rootReducer = combineReducers({
  key: keyReducer,
})

export default rootReducer
