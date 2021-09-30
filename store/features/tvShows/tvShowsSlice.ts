import { createSlice } from "@reduxjs/toolkit"
import { IEpisodeData, ISeasonData, ITV, ITVShowDetails, ITVState } from "../../../interfaces/tvShow"


const initialState:ITVState = {
  allTVShows: [],
  popularTVShows: [],
  topRatedTVShows: [],
  tvShow: {} as ITVShowDetails,
  loadingTVShow: false,
  loadingTVShows: false,
  loadingSeason: false,
  loadingEpisode: false,
  loadingPopularTVShows: false,
  loadingTopRatedTVShows: false,
  query: '',
  page: 1,
  total_pages: 0,
  total_results: 0,
  sort_by: ''
}


const tvShowsSlice = createSlice({
  name: 'tv-shows',
  initialState,
  reducers: {
    startFetchingTVShows(state):ITVState{
      return {
        ...state,
        loadingTVShows: true
      }
    },
    startFetchingPopularTVShows(state):ITVState{
      return {
        ...state,
        loadingPopularTVShows: true
      }
    },
    startFetchingTopRatedTVShows(state):ITVState{
      return {
        ...state,
        loadingTopRatedTVShows: true
      }
    },
    changePage(state, { payload }):ITVState {
      return {
        ...state,
        page: payload
      }
    },
    fetchAllTVShowsSuccedded(state, { payload: { page, results, total_pages, total_results } }):ITVState{
      return {
        ...state,
        loadingTVShows: false,
        allTVShows: results,
        page, total_pages,
        total_results
      }
    },
    fetchAllTVShowsFailed(state):ITVState {
      return {
        ...state,
        loadingTVShows: false
      }
    },
    fetchPopularTVShowsSuccedded(state, { payload }):ITVState {
      return {
        ...state,
        loadingPopularTVShows: false,
        popularTVShows: payload
      }
    },
    fetchPopularTVShowsFailed(state):ITVState {
      return {
        ...state,
        loadingPopularTVShows: false
      }
    },
    fetchTopRatedTVShowsSuccedded(state, { payload }):ITVState {
      return {
        ...state,
        loadingTopRatedTVShows: false,
        topRatedTVShows: payload
      }
    },
    fetchTopRatedTVShowsFailed(state):ITVState {
      return {
        ...state,
        loadingTopRatedTVShows: false
      }
    },
    startSearching(state):ITVState {
      return {
        ...state,
        loadingTVShows: true
      }
    },
    changeSearchTitleTVShows(state, { payload }):ITVState {
      return {
        ...state,
        query: payload
      }
    },
    searchTVShowSuccedded(state, { payload: { page, results, total_pages, total_results } }):ITVState {
      return {
        ...state,
        page, total_pages,
        allTVShows: results,
        loadingTVShows: false,
        total_results
      }
    },
    searchTVShowFailed(state):ITVState {
      return {
        ...state,
        loadingTVShows: false
      }
    },
    sortTVShows(state, { payload }):ITVState {
      return {
        ...state,
        sort_by: payload
      }
    },
    sortTVShowsSuccedded(state, { payload: { page, results, total_pages, total_results } }):ITVState {
      return {
        ...state,
        page, total_pages,
        allTVShows: results,
        loadingTVShows: false,
        total_results
      }
    },
    sortTVShowsFailed(state):ITVState {
      return {
        ...state,
        loadingTVShows: false
      }
    },
    startFetchingTVShowById(state):ITVState {
      return {
        ...state,
        loadingTVShow: true
      }
    },
    fetchTVShowByIdSuccedded(state, { payload }):ITVState {
      return {
        ...state,
        loadingTVShow: false,
        tvShow: payload
      }
    },
    fetchTVShowByIdFailed(state):ITVState {
      return {
        ...state,
        loadingTVShow: false,
        tvShow: {} as ITVShowDetails
      }
    },
    startFetchingSeason(state):ITVState {
      return {
        ...state,
        loadingSeason: true
      }
    },
    fetchSeasonByIdSuccedded(state, { payload }):ITVState {
      return {
        ...state,
        loadingSeason: false,
        tvShow: {
          ...state.tvShow,
          season: payload
        }
      }
    },
    fetchSeasonByIdFailed(state):ITVState {
      return {
        ...state,
        loadingSeason: false,
        tvShow: {
          ...state.tvShow,
          season: {} as ISeasonData
        }
      }
    },
    startFetchingEpisode(state):ITVState {
      return {
        ...state,
        loadingEpisode: true
      }
    },
    fetchEpisodeByIdSuccedded(state, { payload }):ITVState {
      return {
        ...state,
        loadingEpisode: false,
        tvShow: {
          ...state.tvShow,
          episode: payload
        }
      }
    },
    fetchEpisodeByIdFailed(state): ITVState {
      return {
        ...state,
        loadingEpisode: false,
        tvShow: {
          ...state.tvShow,
          episode: {} as IEpisodeData
        }
      }
    }
  }
})


// Export Actions
export const {
  fetchAllTVShowsSuccedded,fetchPopularTVShowsFailed, fetchPopularTVShowsSuccedded, fetchTopRatedTVShowsFailed,
  fetchTopRatedTVShowsSuccedded, fetchAllTVShowsFailed, startFetchingTVShows, changePage, changeSearchTitleTVShows,
  searchTVShowFailed, searchTVShowSuccedded, startFetchingPopularTVShows, startFetchingTopRatedTVShows, startSearching, 
  sortTVShows, sortTVShowsSuccedded, sortTVShowsFailed, startFetchingTVShowById, fetchTVShowByIdFailed, fetchTVShowByIdSuccedded,
  startFetchingSeason, fetchSeasonByIdSuccedded, fetchSeasonByIdFailed, startFetchingEpisode, fetchEpisodeByIdSuccedded, fetchEpisodeByIdFailed
} = tvShowsSlice.actions


// Export Reducer
export default tvShowsSlice.reducer