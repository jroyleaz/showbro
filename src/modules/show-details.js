import { get, isEmpty } from 'lodash'

export const SHOW_DETAILS_REQUESTED = 'show-details/SHOW_DETAILS_REQUESTED'
export const SHOW_DETAILS_COMPLETED = 'show-details/SHOW_DETAILS_COMPLETED'
export const SHOW_DETAILS_EMPTY = 'show-details/SHOW_DETAILS_EMPTY'
export const CACHE_USED = 'show-details/CACHE_USED'

const URL_IMDB = 'https://www.imdb.com/title/'
const URL_THETVDB = 'https://www.thetvdb.com/?tab=series&id='
const URL_EZTV = 'https://eztv.ag/search/'

const initialState = {
  details: {},
  currentShowId: '',
  isLoading: false,
  detailsEmpty: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DETAILS_REQUESTED:
      return {
        ...state,
        currentShowId: action.payload,
        isLoading: true,
      }
    case SHOW_DETAILS_COMPLETED:
      return {
        ...state,
        isLoading: false,
        details: action.payload,
        detailsEmpty: false,
      }
    case SHOW_DETAILS_EMPTY:
      return {
        ...state,
        isLoading: false,
        detailsEmpty: true,
      }
    case CACHE_USED:
      return {
        ...state,
        isLoading: false,
        detailsEmpty: false,
        details: action.payload,
      }
    default:
      return state
  }
}

export const showDetails = id => {
  return async (dispatch, getState) => {
    if (isEmpty(id)) return
    id = id.trim()
    try {
      dispatch({
        type: SHOW_DETAILS_REQUESTED,
        payload: id,
      })

      // const state = getState()

      // const cachedData = loadCachedData(id, state)

      // if (cachedData) {
      //   return dispatch({
      //     type: CACHE_USED,
      //     key: id,
      //     payload: cachedData,
      //   })
      // }
      let details = await showDetailsAsync(id)

      details = flattenDetails(details)

      return dispatch({
        type: SHOW_DETAILS_COMPLETED,
        key: id,
        payload: { [id]: details },
      })
    } catch (e) {
      console.log('Show Details Error', e)
    }
  }
}

const showDetailsAsync = async id =>
  await (await fetch(`http://api.tvmaze.com/shows/${id}`)).json()

const flattenDetails = details => {
  return {
    id: Number.parseInt(details.id),
    genres: details.genres.join(', '),
    image: get(details, 'image.medium', ''),
    language: details.language,
    name: details.name,
    network: get(details, 'network.name', ''),
    country: get(details, 'network.country.code', ''),
    language: details.language,
    runtime: details.runtime,
    summary: stripHtml(details.summary),
    previousEpisode: get(details, '_links.previousepisode.href', ''),
    nextEpisode: get(details, '_links.nextepisode.href', ''),
    premiered: details.premiered,
  }
}

const stripHtml = html => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  return tempDiv.textContent || tempDiv.innerText || ''
}
