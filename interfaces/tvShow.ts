import { IGenre } from "./genre"

export interface ITV {
  id: number
  genre_ids: number[]
  name: string
  overview: string
  vote_average: number
  poster_path: string | null
  popularity: number
  vote_count: number
  original_name: string
  original_language: string
  backdrop_path: string
  first_air_date: string
  origin_country: string[]
}

export interface ITVProps {
  tvShow: ITV
}

export interface ITVState {
  allTVShows: ITV[]
  popularTVShows: ITV[]
  topRatedTVShows: ITV[]
  tvShow: ITVShowDetails
  loadingTVShow: boolean
  loadingTVShows: boolean
  loadingSeason: boolean
  loadingEpisode: boolean
  loadingPopularTVShows: boolean
  loadingTopRatedTVShows: boolean
  page: number
  query: string
  total_pages: number
  total_results: number
  sort_by: string
}

export interface ITVData {
  page: number
  results: ITV[]
  total_pages: number
  total_results: number
}

interface ILastEpisode {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string | null
  vote_average: number
  vote_count: number
}

interface ICreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string | null
}

interface INetwork {
  name: string
  id: number
  logo_path: string | null
  origin_country: string
}

interface ICompany {
  id: number
  logo_path: null | string
  name: string
  origin_country: string
}

interface ICountry {
  iso_3166_1: string
  name: string
}

export interface ISeason {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

interface ILanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface ICast {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: string
}

export interface ICrew {
  adult: boolean
  gender: string | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export interface ITVShowVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface IEpisodeData {
  air_date: string
  episode_number: number
  crew: ICrew[]
  guest_stars: ICast[]
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
}

export interface ISeasonData {
  _id: string
  air_date: string
  episodes: IEpisodeData[]
  name: string
  overview: string
  id: number
  poster_path: string | null
  season_number: number
  cast: ICast[]
  crew: ICrew[]
  videos: ITVShowVideo[]
}

export interface ITVShowDetails {
  backdrop_path: string | null
  created_by: ICreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: IGenre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: ILastEpisode
  name: string
  next_episode_to_air: null
  networks: INetwork[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ICompany[]
  production_countries: ICountry[]
  seasons: ISeason[]
  spoken_languages: ILanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  cast: ICast[]
  season: ISeasonData
  episode: IEpisodeData
}
