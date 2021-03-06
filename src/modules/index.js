import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import search from './search'

export default combineReducers({
  router: routerReducer,
  search,
})
