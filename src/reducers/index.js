import { loggedReducer } from './auth'
import { globalState } from './global'
import { appData } from './appData'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  loggedReducer,
  appData,
  globalState,
})

export default allReducers
