import { isEmpty, pickBy } from 'lodash'
import { createSelector } from 'reselect'

export const resultsReady = state => {
  return state.search.searchResults &&
    state.search.searchResults[state.search.searchQuery] &&
    state.search.searchResults[state.search.searchQuery].length > 0
    ? true
    : false
}

export const searchResults = state => {
  return (
    resultsReady(state) && state.search.searchResults[state.search.searchQuery]
  )
}

export const previousEpisodes = (state, num) => {
  if (resultsReady(state)) {
    const episodes =
      state.search.searchResults[state.search.searchQuery][0].episodes
    return episodes.slice(Math.max(episodes.length - 5, 1))
  }
}

export const previousEpisodesImages = state => {
  if (resultsReady(state)) {
    return previousEpisodes(state, 5).map(e => e.image)
  }
}
