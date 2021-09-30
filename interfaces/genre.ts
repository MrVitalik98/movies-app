
export interface IGenre {
  id: number
  name: string
}

export interface IGenreProps {
  genre: IGenre
  t: string
}

export interface IGenreState {
  movieGenres: IGenre[]
  tvGenres: IGenre[]
  loadingMovieGenres: boolean
  loadingTVGenres: boolean
}

export interface IGenreData {
  genres: IGenre[]
}