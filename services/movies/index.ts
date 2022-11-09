import { Dispatch } from 'react'
import * as API from '../api-list'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IAction, IFormState } from '../../interfaces'
import { ICast, ICrew, IMovieData, IMovieDetails, IMovieVideo, IProvider } from '../../interfaces/movie'
import { 
  fetchAllMoviesFailed, fetchAllMoviesSuccedded, startFetchingMovies, 
  fetchPopularMoviesFailed, fetchPopularMoviesSuccedded, fetchTopRatedMoviesFailed, 
  fetchTopRatedMoviesSuccedded, searchMoviesFailed, searchMoviesSuccedded, 
  startFetchingPopularMovies, startFetchingTopRatedMovies, startSearching, sortMoviesFailed, sortMoviesSuccedded, startFetchingMovieById, fetchMovieByIdSuccedded, fetchMovieByIdFailed
} from '../../store/features/movies/moviesSlice'


export const fetchAllMovies = (currentPage: number) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingMovies())

    try {
      const { data } = await API.getAllMovies<IMovieData>(currentPage)
      dispatch(fetchAllMoviesSuccedded({ ...data }))
    }catch(e) {
      dispatch(fetchAllMoviesFailed())
    }
  }
}


export const fetchPopularMovies = () => {
  return async (dispatch:Dispatch<IAction>, getState:typeof useTypedSelector):Promise<void> => {
    dispatch(startFetchingPopularMovies())

    try {
      const { page } = getState(state => state.moviesReducer)
      const { data } = await API.getMoviesByType<IMovieData>('popular', page)
      dispatch(fetchPopularMoviesSuccedded(data.results))
    }catch(e) {
      dispatch(fetchPopularMoviesFailed())
    }
  }
}


export const fetchTopRatedMovies = () => {
  return async (dispatch:Dispatch<IAction>, getState:typeof useTypedSelector):Promise<void> => {
    dispatch(startFetchingTopRatedMovies())

    try {
      const { page } = getState(state => state.moviesReducer)
      const { data } = await API.getMoviesByType<IMovieData>('top_rated', page)
      dispatch(fetchTopRatedMoviesSuccedded(data.results))
    }catch(e) {
      dispatch(fetchTopRatedMoviesFailed())
    }
  }
}


export const searchMovie = (currentPage: number, query: string = '') => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startSearching())

    try {
      const { data } = await API.searchMovie<IMovieData>(currentPage, query)
      dispatch(searchMoviesSuccedded({ ...data }))
    }catch(e) {
      dispatch(searchMoviesFailed())
    }
  }
}


export const getSortedMovies = (currentPage: number, form: IFormState ) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingMovies())

    try {
      const { data } = await API.getSortedMovies<IMovieData>(currentPage, form)
      dispatch(sortMoviesSuccedded({ ...data }))
    }catch(e) {
      dispatch(sortMoviesFailed())
    }
  }
}


export const fetchMovieByID = (movieID: number) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingMovieById())

    try {
      const { data } = await API.getMovieByID<IMovieDetails>(movieID)
      const { data: { results: providers } } = await API.getMovieProvidersByID<{ id: number, results: IProvider[] }>(movieID)
      const { data: { results } } = await API.getMovieVideosByID<{ id: number, results: IMovieVideo[] }>(movieID)
      const { data: { cast } } = await API.getMovieCreditsByID<{ id: number, crew: ICrew[], cast: ICast[]}>(movieID)
      dispatch(fetchMovieByIdSuccedded({ ...data, videos: results, providers, cast }))
    }catch(e) {
      dispatch(fetchMovieByIdFailed())
    }
  }
}