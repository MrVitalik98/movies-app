import { IGenre } from "./genre"

export interface IMovie {
  id: number
  genre_ids?: number[]
  title: string
  overview: string
  vote_average: number
  release_date: string
  poster_path: string
  popularity: number
  video: boolean
  vote_count: number
  original_title: string
  original_language: string
  adult: boolean
  backdrop_path: string
}

export interface IMovieProps {
  movie: IMovie
}

export interface IMovieState {
  allMovies: IMovie[]
  popularMovies: IMovie[]
  topRatedMovies: IMovie[]
  movie: IMovieDetails
  loadingMovie: boolean
  loadingMovies: boolean
  loadingPopularMovies: boolean
  loadingTopRatedMovies: boolean
  page: number
  query: string
  total_pages: number
  total_results: number
  sort_by: string
}

export interface IMovieData {
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
  dates?: {
    maximum?: string
    minimum?: string
  }
}

interface ICompany{
  name: string
  id: number
  logo_path: string | null
  origin_country: string
}

interface ICountry {
  iso_3166_1: string
  name: string
}

interface ILanguage {
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

interface IObject {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface IProvider {
  link: string
  buy: IObject[]
  flatrate: IObject[]
}

export interface IMovieVideo {
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

export interface IMovieDetails {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: null | object
  budget: number
  genres: IGenre[]
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  production_companies: ICompany[]
  production_countries: ICountry[]
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: ILanguage[]
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: IMovieVideo[]
  crew: ICrew[]
  cast: ICast[]
  providers: IProvider[]
}
