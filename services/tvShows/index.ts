import { Dispatch } from 'react'
import * as API from '../api-list'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IAction, IFormState } from '../../interfaces'
import { ICast, ICrew, ISeasonData, ITVData, ITVShowDetails, ITVShowVideo } from '../../interfaces/tvShow'
import { 
  fetchAllTVShowsFailed, fetchAllTVShowsSuccedded, startFetchingTVShows, 
  fetchPopularTVShowsFailed, fetchPopularTVShowsSuccedded, startFetchingTopRatedTVShows, 
  startSearching, fetchTopRatedTVShowsSuccedded, startFetchingPopularTVShows, 
  fetchTopRatedTVShowsFailed, searchTVShowSuccedded, searchTVShowFailed, sortTVShowsSuccedded, 
  sortTVShowsFailed, startFetchingTVShowById, fetchTVShowByIdSuccedded, fetchTVShowByIdFailed, 
  startFetchingSeason, fetchSeasonByIdFailed, fetchSeasonByIdSuccedded, startFetchingEpisode, fetchEpisodeByIdSuccedded, fetchEpisodeByIdFailed
} from '../../store/features/tvShows/tvShowsSlice'


export const fetchAllTVShows = (currentPage: number) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingTVShows())

    try {
      const { data } = await API.getAllTVShows<ITVData>(currentPage)
      dispatch(fetchAllTVShowsSuccedded({ ...data }))
    }catch(e) {
      dispatch(fetchAllTVShowsFailed())
    }
  }
}


export const fetchPopularTVShows = () => {
  return async (dispatch:Dispatch<IAction>, getState:typeof useTypedSelector):Promise<void> => {
    dispatch(startFetchingPopularTVShows())

    try {
      const { page } = getState(state => state).tvShowsReducer
      const { data } = await API.getTVShowsByType<ITVData>('popular', page)
      dispatch(fetchPopularTVShowsSuccedded(data.results))
    }catch(e) {
      dispatch(fetchPopularTVShowsFailed())
    }
  }
}

export const fetchTopRatedTVShows = () => {
  return async (dispatch:Dispatch<IAction>, getState:typeof useTypedSelector):Promise<void> => {
    dispatch(startFetchingTopRatedTVShows())

    try {
      const { page } = getState(state => state).tvShowsReducer
      const { data } = await API.getTVShowsByType<ITVData>('top_rated', page)
      dispatch(fetchTopRatedTVShowsSuccedded(data.results))
    }catch(e) {
      dispatch(fetchTopRatedTVShowsFailed())
    }
  }
}


export const searchTVShow = (currentPage: number, query: string = '') => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startSearching())

    try {
      const { data } = await API.searchTVShow<ITVData>(currentPage, query)
      dispatch(searchTVShowSuccedded({ ...data }))
    }catch(e) {
      dispatch(searchTVShowFailed())
    }
  }
}


export const getSortedTVShows = (currentPage: number, form: IFormState ) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingTVShows())

    try {
      const { data } = await API.getSortedTVShows<ITVData>(currentPage, form)
      dispatch(sortTVShowsSuccedded({ ...data }))
    }catch(e) {
      dispatch(sortTVShowsFailed())
    }
  }
}


export const fetchTVShowById = (tvShowID: number) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingTVShowById())

    try {
      const { data } = await API.getTVShowByID<ITVShowDetails>(tvShowID)
      const { data: { cast } } = await API.getTVShowCreditsByID<{ id: number, crew: ICrew[], cast: ICast[]}>(tvShowID)
      dispatch(fetchTVShowByIdSuccedded({ ...data, cast }))
    }catch(e) {
      dispatch(fetchTVShowByIdFailed())
    }
  }
}


export const fetchSeasonById = (tvShowID: number, seasonNumber: number) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingSeason())
    
    try {
      const { data: season } = await API.getTVShowSeasonByID<ISeasonData>(tvShowID, seasonNumber)
      const { data: { cast } } = await API.getTVShowSeasonCreditsById<{ id: number, crew: ICrew[], cast: ICast[] }>(tvShowID, seasonNumber)
      const { data: { results: videos } } = await API.getTVShowSeasonVideosByID<{ id: number, results: ITVShowVideo[] }>(tvShowID, seasonNumber)
      dispatch(fetchSeasonByIdSuccedded({ ...season, cast, videos }))
    }catch(e) {
      dispatch(fetchSeasonByIdFailed())
    }
  }
}


export const fetchEpisodeById = (tvShowID: number, seasonNumber: number, episodeNumber: number) => {
  return async (dispatch:Dispatch<IAction>):Promise<void> => {
    dispatch(startFetchingEpisode())

    try {
      const { data: episode } = await API.getTVShowEpisodeById<ISeasonData>(tvShowID, seasonNumber, episodeNumber)
      dispatch(fetchEpisodeByIdSuccedded({ ...episode }))
    }catch(e) {
      dispatch(fetchEpisodeByIdFailed())
    }
  }
}