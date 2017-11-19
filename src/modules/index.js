import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import search from './search'
import showDetails from './show-details'

export default combineReducers({
  router: routerReducer,
  showDetails,
  search,
})
