import { get, max, pick } from 'lodash'
import { createSelector } from 'reselect'

const MISSING_IMAGE = 'no_image.png'

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

export const seasons = (state, id) => {
  return resultsReady(state) && searchResults(state)[id].seasons
}

// export const latestSeason = state => {
//   return resultsReady(state) && max(pick(seasons(state), 'number'))
// }

export const seasonImages = (state, id) => {
  return (
    resultsReady(state) &&
    seasons(state, id).map(s =>
      get(s, 'image.medium', searchResults(state)[id].image),
    )
  )
}

// export const previousEpisodes = (state, num) => {
//   if (resultsReady(state)) {
//     const episodes =
//       state.search.searchResults[state.search.searchQuery][0].episodes
//     return episodes.slice(Math.max(episodes.length - 5, 1))
//   }
// }

// export const previousEpisodesImages = state => {
//   if (resultsReady(state)) {
//     return previousEpisodes(state, 5).map(e => e.image)
//   }
// }
