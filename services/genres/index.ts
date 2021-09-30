import { Dispatch } from 'react'
import * as API from '../api-list'
import { IAction } from '../../interfaces'
import { IGenreData } from '../../interfaces/genre'
import { 
  fetchMovieGenresFailed, fetchMovieGenresSuccedded, startFetching, 
  fetchTVGenresSuccedded, fetchTVGenresFailed
} from '../../store/features/genres/genresSlice'



export const fetchAllMovieGenres = () => {
  return async (dispatch: Dispatch<IAction>):Promise<void> => {
    dispatch(startFetching())

    try { 
      const { data } = await API.getAllMovieGenres<IGenreData>()
      dispatch(fetchMovieGenresSuccedded(data.genres))
    }catch(e) {
      dispatch(fetchMovieGenresFailed())
    }
  }
}


export const fetchAllTVGenres = () => {
  return async (dispatch: Dispatch<IAction>):Promise<void> => {
    dispatch(startFetching())

    try { 
      const { data } = await API.getAllTVGenres<IGenreData>()
      dispatch(fetchTVGenresSuccedded(data.genres))
    }catch(e) {
      dispatch(fetchTVGenresFailed())
    }
  }
}
