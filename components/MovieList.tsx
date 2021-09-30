import { useRouter } from 'next/router'
import { FC } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import { IMovie } from '../interfaces/movie'
import { useAction } from '../hooks/useAction'
import MovieItem from './MovieItem'


interface IProps {
  movies: IMovie[]
  isShowBtn: boolean
  sortBy?: string
}


const MovieList:FC<IProps> = ({ movies, isShowBtn, sortBy }) => {
  const router = useRouter()
  const { sortMovies } = useAction()

  const showSortedMovies = ():void => {
    sortMovies(sortBy)
    router.push('/')
  }


  return (
    movies?.length ? (
      <div className="cards">
        {movies?.map(movie => {
          return <MovieItem key={movie.id} movie={movie} />
        })}

        {isShowBtn ? (
          <div className="more">
            <button className="btn" onClick={showSortedMovies}>
              <span>More</span>
              <FontAwesomeIcon icon={faArrowCircleRight}></FontAwesomeIcon>
            </button>
          </div>
        ) : null}
      </div>
    ) : null
  )
}

export default MovieList