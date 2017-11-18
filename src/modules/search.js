import Promise, { getNewLibraryCopy } from 'bluebird'
import _ from 'lodash'

export const SEARCH_REQUESTED = 'search/SEARCH_REQUESTED'
export const SEARCH_COMPLETED = 'search/SEARCH_COMPLETED'
export const SEARCH_EMPTY = 'search/SEARCH_EMPTY'
export const SEARCH_SORTED = 'search/SEARCH_SORTED'
export const CACHE_USED = 'search/CACHE_USED'
export const UPDATE_SORTING = 'search/UPDATE_SORTING'
export const MISSING_IMAGE = '/no_image.png'

const URL_IMDB = 'https://www.imdb.com/title/'
const URL_THETVDB = 'https://www.thetvdb.com/?tab=series&id='
const URL_EZTV = 'https://eztv.ag/search/'

const initialState = {
  searchResults: {},
  searchQuery: '',
  isSearching: false,
  searchEmpty: false,
  searchSorting: {
    sortBy: 'relevance',
    sortDirection: 'desc',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...state,
        searchQuery: action.payload,
        isSearching: true,
      }

    case SEARCH_COMPLETED:
      return {
        ...state,
        isSearching: false,
        searchResults: {
          ...state.searchResults,
          [action.key]: action.payload,
        },
        searchEmpty: false,
      }
    case SEARCH_EMPTY:
      return {
        ...state,
        isSearching: false,
        searchEmpty: true,
      }
    case SEARCH_SORTED:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          [action.key]: action.payload,
        },
      }
    case UPDATE_SORTING:
      return {
        ...state,
        searchSorting: action.payload,
      }
    case CACHE_USED:
      return {
        ...state,
        isSearching: false,
        searchEmpty: false,
      }
    default:
      return state
  }
}

export const search = query => {
  return async (dispatch, getState) => {
    if (_.isEmpty(query)) return
    try {
      dispatch({
        type: SEARCH_REQUESTED,
        payload: query.trim(),
      })

      const state = getState()

      if (
        state.search.searchResults[state.search.searchQuery] &&
        state.search.searchResults[state.search.searchQuery].length > 0
      ) {
        return dispatch({
          type: CACHE_USED,
        })
      }

      query = query.trim()
      const data = await searchShowsAsync(query)
      let parsed = []

      if (!_.isEmpty(data)) {
        parsed = await Promise.all(
          data.map(async d => {
            const nextEpisodeUrl = _.get(d, 'show._links.nextepisode.href')
            if (nextEpisodeUrl) {
              let nextEpisode = await getNextEpisode(nextEpisodeUrl)
              nextEpisode.episodeTag = getEpisodeTag(nextEpisode)
              const seasons = await getSeasonsByShowId(d.show.id)
              const links = [
                {
                  title: 'EZTV',
                  href: `${URL_EZTV}${d.show.name}-${nextEpisode.episodeTag}`,
                },
              ]

              if (d.show.externals.imdb)
                links.push({
                  title: 'IMDB',
                  href: `${URL_IMDB}${d.show.externals.imdb}`,
                })

              if (d.show.externals.thetvdb)
                links.push({
                  title: 'The TVDB',
                  href: `${URL_IMDB}${d.show.externals.thetvdb}`,
                })

              return {
                id: d.show.id,
                name: d.show.name ? d.show.name : 'Unknown',
                summary: !_.isEmpty(d.show.summary)
                  ? stripHtml(d.show.summary)
                  : 'No summary data found',
                status: d.show.status,
                network: d.show.network ? d.show.network.name : 'Unknown',
                premiered: d.show.premiered,
                image: d.show.image ? d.show.image.medium : MISSING_IMAGE,
                rating: d.show.rating ? d.show.rating.average : '',
                updated: d.show.updated,
                relevance: d.score,
                nextEpisode,
                links,
                seasons,
              }
            } else {
              return
            }
          }),
        )
      }

      parsed = _.compact(parsed)

      if (_.isEmpty(parsed)) {
        return dispatch({
          type: SEARCH_EMPTY,
        })
      }

      parsed = _.orderBy(
        parsed,
        state.search.searchSorting.sortBy,
        state.search.searchSorting.sortDirection,
      )
      return dispatch({
        type: SEARCH_COMPLETED,
        key: query,
        payload: parsed,
      })
    } catch (e) {
      console.log('error', e)
    }
  }
}

const searchShowsAsync = async query =>
  await (await fetch(`http://api.tvmaze.com/search/shows?q=${query}`)).json()

const getShowEpisodes = async id =>
  await (await fetch(`http://api.tvmaze.com/shows/${id}/episodes`)).json()

const getNextEpisodeByUrl = (episodes, url) => {
  const episodeId = Number.parseInt(url.substr(url.lastIndexOf('/') + 1))
  return _.filter(episodes, ['id', episodeId]).shift()
}

const getSeasonsByShowId = async id =>
  await (await fetch(`http://api.tvmaze.com/shows/${id}/seasons`)).json()

const getNextEpisode = async url => await (await fetch(url)).json()

const getEpisodeTag = episode => {
  return `s${('00' + episode.season).slice(-2)}e${(
    '00' +
    (episode.number - 1)
  ).slice(-2)}`
}

export const sortBy = (sortBy, accessor) => {
  return (dispatch, getState) => {
    const state = getState()
    const key = state.search.searchQuery
    const results = state.search.searchResults[key]
    const sortDirection =
      state.search.searchSorting.sortDirection === 'desc' ? 'asc' : 'desc'
    const sorted = _.orderBy(results, sortBy, sortDirection)

    dispatch({
      type: UPDATE_SORTING,
      payload: {
        sortBy,
        sortDirection,
      },
    })

    return dispatch({
      type: SEARCH_SORTED,
      key,
      payload: sorted,
    })
  }
}

const stripHtml = html => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  return tempDiv.textContent || tempDiv.innerText || ''
}
