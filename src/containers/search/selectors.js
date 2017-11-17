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
