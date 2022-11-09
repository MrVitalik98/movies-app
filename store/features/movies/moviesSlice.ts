import { createSlice } from "@reduxjs/toolkit"
import { IMovieDetails, IMovieState } from "../../../interfaces/movie"


const initialState:IMovieState = {
  allMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  movie: {} as IMovieDetails,
  loadingMovie: false,
  loadingMovies: false,
  loadingPopularMovies: false,
  loadingTopRatedMovies: false,
  query: '',
  page: 1,
  total_pages: 0,
  total_results: 0,
  sort_by: ''
}


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    startFetchingMovies(state):IMovieState{
      return {
        ...state,
        loadingMovies: true
      }
    },
    startFetchingPopularMovies(state):IMovieState{
      return {
        ...state,
        loadingPopularMovies: true
      }
    },
    startFetchingTopRatedMovies(state):IMovieState{
      return {
        ...state,
        loadingTopRatedMovies: true
      }
    },
    changePage(state, { payload }):IMovieState {
      return {
        ...state,
        page: payload
      }
    },
    fetchAllMoviesSuccedded(state, { payload: { page, results, total_pages, total_results } }):IMovieState{
      return {
        ...state,
        loadingMovies: false,
        allMovies: results,
        page, total_pages,
        total_results
      }
    },
    fetchAllMoviesFailed(state):IMovieState {
      return {
        ...state,
        loadingMovies: false
      }
    },
    fetchPopularMoviesSuccedded(state, { payload }):IMovieState {
      return {
        ...state,
        loadingPopularMovies: false,
        popularMovies: payload
      }
    },
    fetchPopularMoviesFailed(state):IMovieState {
      return {
        ...state,
        loadingPopularMovies: false
      }
    },
    fetchTopRatedMoviesSuccedded(state, { payload }):IMovieState {
      return {
        ...state,
        loadingTopRatedMovies: false,
        topRatedMovies: payload
      }
    },
    fetchTopRatedMoviesFailed(state):IMovieState {
      return {
        ...state,
        loadingTopRatedMovies: false
      }
    },
    startSearching(state):IMovieState {
      return {
        ...state,
        loadingMovies: true
      }
    },
    changeSearchTitleMovies(state, { payload }):IMovieState {
      return {
        ...state,
        query: payload
      }
    },
    searchMoviesSuccedded(state, { payload: { page, results, total_pages, total_results } }):IMovieState {
      return {
        ...state,
        page, total_pages,
        total_results,
        allMovies: results,
        loadingMovies: false
      }
    },
    searchMoviesFailed(state):IMovieState {
      return {
        ...state,
        loadingMovies: false
      }
    },
    sortMovies(state, { payload }):IMovieState {
      return {
        ...state,
        sort_by: payload
      }
    },
    sortMoviesSuccedded(state, { payload: { page, results, total_pages, total_results } }):IMovieState {
      return {
        ...state,
        page, total_pages,
        total_results,
        allMovies: results,
        loadingMovies: false
      }
    },
    sortMoviesFailed(state):IMovieState {
      return {
        ...state,
        loadingMovies: false
      }
    },
    startFetchingMovieById(state):IMovieState {
      return {
        ...state,
        loadingMovie: true
      }
    },
    fetchMovieByIdSuccedded(state, { payload }):IMovieState {
      return {
        ...state,
        loadingMovie: false,
        movie: payload
      }
    },
    fetchMovieByIdFailed(state):IMovieState {
      return {
        ...state,
        loadingMovie: false,
        movie: {} as IMovieDetails
      }
    }
  }
})


// Export Actions
export const {
  fetchAllMoviesSuccedded,fetchPopularMoviesFailed, fetchPopularMoviesSuccedded, fetchTopRatedMoviesFailed,
  fetchTopRatedMoviesSuccedded, fetchAllMoviesFailed, startFetchingMovies, changePage, changeSearchTitleMovies,
  searchMoviesFailed, searchMoviesSuccedded, startFetchingPopularMovies, startFetchingTopRatedMovies, startSearching,
  sortMovies, sortMoviesFailed, sortMoviesSuccedded, startFetchingMovieById, fetchMovieByIdSuccedded, fetchMovieByIdFailed
} = moviesSlice.actions

// Export Reducer
export default moviesSlice.reducer