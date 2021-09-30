import { createSlice } from "@reduxjs/toolkit";
import { IGenreState } from "../../../interfaces/genre";


const initialState:IGenreState = {
  movieGenres: [],
  tvGenres: [],
  loadingMovieGenres: false,
  loadingTVGenres: false
}

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    startFetching(state):IGenreState {
      return {
        ...state,
        loadingMovieGenres: true,
        loadingTVGenres: true
      }
    },
    fetchMovieGenresSuccedded(state, { payload }):IGenreState {
      return {
        ...state,
        loadingMovieGenres: false,
        movieGenres: payload
      }
    },
    fetchMovieGenresFailed(state):IGenreState {
      return {
        ...state,
        loadingMovieGenres: false
      }
    },
    fetchTVGenresSuccedded(state, { payload }):IGenreState {
      return {
        ...state,
        loadingTVGenres: false,
        tvGenres: payload
      }
    },
    fetchTVGenresFailed(state):IGenreState {
      return {
        ...state,
        loadingTVGenres: false
      }
    },
  }
})


// Export Actions
export const { 
  startFetching, fetchMovieGenresSuccedded, fetchMovieGenresFailed,
  fetchTVGenresFailed, fetchTVGenresSuccedded
} = genresSlice.actions

// Export Reducer
export default genresSlice.reducer