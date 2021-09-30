import axios, { AxiosResponse } from 'axios'
import { IFormState } from '../interfaces'

const api = axios.create({
  baseURL: `${process.env.API_URL}`
})

export const getMoviesByType = <T>(type: string, page: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/movie/${type}?api_key=${process.env.API_KEY}&language=${lang}&page=${page}`)
export const getTVShowsByType = <T>(type: string, page: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/tv/${type}?api_key=${process.env.API_KEY}&language=${lang}&page=${page}`)

export const getAllMovieGenres = <T>(lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/genre/movie/list?api_key=${process.env.API_KEY}&language=${lang}`)
export const getAllTVGenres = <T>(lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/genre/tv/list?api_key=${process.env.API_KEY}&language=${lang}`)

export const getAllMovies = <T>(page: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/discover/movie?api_key=${process.env.API_KEY}&language=${lang}&page=${page}`)
export const getAllTVShows = <T>(page: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/discover/tv?api_key=${process.env.API_KEY}&language=${lang}&page=${page}`)

export const getMovieByID = <T>(movieID: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/movie/${movieID}?api_key=${process.env.API_KEY}&language=${lang}`)
export const getMovieVideosByID = <T>(movieID: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/movie/${movieID}/videos?api_key=${process.env.API_KEY}&language=${lang}`)
export const getMovieProvidersByID = <T>(movieID: number):Promise<AxiosResponse<T>> => api.get(`/movie/${movieID}/watch/providers?api_key=${process.env.API_KEY}`)
export const getMovieCreditsByID = <T>(movieID: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/movie/${movieID}/credits?api_key=${process.env.API_KEY}&language=${lang}`)

export const getTVShowByID = <T>(tvShowID: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/tv/${tvShowID}?api_key=${process.env.API_KEY}&language=${lang}`)
export const getTVShowCreditsByID = <T>(tvShowID: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/tv/${tvShowID}/credits?api_key=${process.env.API_KEY}&language=${lang}`)
export const getTVShowSeasonByID = <T>(tvShowID: number, seasonNumber: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/tv/${tvShowID}/season/${seasonNumber}?api_key=${process.env.API_KEY}&language=${lang}`)
export const getTVShowSeasonCreditsById = <T>(tvShowID: number, seasonNumber: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/tv/${tvShowID}/season/${seasonNumber}/credits?api_key=${process.env.API_KEY}&language=${lang}`)
export const getTVShowSeasonVideosByID = <T>(tvShowID: number, seasonNumber: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/tv/${tvShowID}/season/${seasonNumber}/videos?api_key=${process.env.API_KEY}&language=${lang}`)
export const getTVShowEpisodeById = <T>(tvShowID: number, seasonNumber: number, episodeNumber: number, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`/tv/${tvShowID}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.API_KEY}&language=${lang}`)

export const searchMovie = <T>(page: number, query: string, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`search/movie?api_key=${process.env.API_KEY}&language=${lang}&query=${query}&page=${page}`)
export const searchTVShow = <T>(page: number, query: string, lang: string = 'en-US'):Promise<AxiosResponse<T>> => api.get(`search/tv?api_key=${process.env.API_KEY}&language=${lang}&query=${query}&page=${page}`)

export const getSortedMovies = <T>(page: number, data: IFormState, lang: string = 'en-US'):Promise<AxiosResponse<T>> => {
  const { sort_by, with_genres, vote_average, release_date } = data
  return api.get(`/discover/movie?api_key=${process.env.API_KEY}&language=${lang}&page=${page}${sort_by ? `&sort_by=${sort_by}` : ''}${with_genres ? `&with_genres=${with_genres}` : ''}${vote_average?.from ? `&vote_average.gte=${vote_average?.from}` : ''}${vote_average?.to ? `&vote_average.lte=${vote_average?.to}` : ''}${release_date?.from ? `&primary_release_date.gte=${release_date?.from}` : ''}${release_date?.to ? `&primary_release_date.lte=${release_date?.to}` : ''}`)
}
export const getSortedTVShows = <T>(page: number, data: IFormState, lang: string = 'en-US'):Promise<AxiosResponse<T>> => {
  const { sort_by, with_genres, vote_average, release_date } = data
  return api.get(`/discover/tv?api_key=${process.env.API_KEY}&language=${lang}&page=${page}${sort_by ? `&sort_by=${sort_by}` : ''}${with_genres ? `&with_genres=${with_genres}` : ''}${vote_average?.from ? `&vote_average.gte=${vote_average?.from}` : ''}${vote_average?.to ? `&vote_average.lte=${vote_average?.to}` : ''}${release_date?.from ? `&first_air_date.gte=${release_date?.from}` : ''}${release_date?.to ? `&first_air_date.lte=${release_date?.to}` : ''}`)
}