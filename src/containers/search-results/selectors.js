import { get, isEmpty } from 'lodash'

export const resultsReady = state => {
  const key = state.search.searchQuery
  return state.search.searchResults &&
    state.search.searchResults[key] &&
    state.search.searchResults[key].length > 0
    ? true
    : false
}

export const searchResults = state => {
  const key = state.search.searchQuery
  return resultsReady(state) && state.search.searchResults[key]
}

export const seasons = (state, id) => {
  return resultsReady(state) && searchResults(state)[id].seasons
}

export const seasonImages = (state, id) => {
  return (
    resultsReady(state) &&
    seasons(state, id).map(s =>
      get(s, 'image.medium', searchResults(state)[id].image),
    )
  )
}

export const getDetails = state => {
  if (!isEmpty(state.showDetails.details[state.showDetails.currentShowId])) {
    return state.showDetails.details[state.showDetails.currentShowId]
  }
}
