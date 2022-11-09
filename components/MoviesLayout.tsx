import { useEffect, FC, ReactNode } from 'react'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'
import DualRingLoader from './loaders/DualRingLoader'
import MovieList from './MovieList'


interface IProps {
  children: ReactNode
}


const MoviesLayout:FC<IProps> = ({ children }) => {
  const { loadingPopularMovies, loadingTopRatedMovies, popularMovies, topRatedMovies } = useTypedSelector(state => state.moviesReducer)
  const { fetchPopularMovies, fetchTopRatedMovies } = useAction()

  
  useEffect(():void => {
    fetchPopularMovies()
    fetchTopRatedMovies()
  }, [])



  return (
    <div className="moviesLayout">
      <div className="jumbotron">
        <h2>Popular Movies</h2>
        <div className="movieList">
          {loadingPopularMovies ? <DualRingLoader /> : (
            <MovieList 
              movies={popularMovies} 
              isShowBtn={true}
              sortBy="popularity.desc"  
            />
          )}
        </div>
      </div>
      
      {children}

      <div className="jumbotron">
        <h2>Top Rated Movies</h2>
        <div className="movieList" id="topRatedMovies">
          {loadingTopRatedMovies ? <DualRingLoader /> : (
            <MovieList 
              movies={topRatedMovies} 
              isShowBtn={true}
              sortBy="vote_count.desc"
            />
          )}
        </div>
      </div>
    </div>
  )
}


export default MoviesLayout