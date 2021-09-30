import { useEffect, FC, ReactNode } from 'react'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'
import DualRingLoader from './loaders/DualRingLoader'
import TvShowList from './TvShowList'


interface IProps {
  children: ReactNode
}


const TvShowsLayout:FC<IProps> = ({ children }) => {
  const { loadingPopularTVShows, loadingTopRatedTVShows, popularTVShows, topRatedTVShows } = useTypedSelector(state => state.tvShowsReducer)
  const { fetchPopularTVShows, fetchTopRatedTVShows } = useAction()


  useEffect(():void => {
    fetchPopularTVShows()
    fetchTopRatedTVShows()
  }, [])


  return (
    <div className="tvShowsLayout">
      <div className="jumbotron">
        <h2>Popular TV Shows</h2>
        <div className="tvShowList">
          {loadingPopularTVShows ? <DualRingLoader /> : (
            <TvShowList 
              tvShows={popularTVShows} 
              isShowBtn={true}
              sortBy="popularity.desc"
            />
          )}
        </div>
      </div>
            
      {children}
      
      <div className="jumbotron">
        <h2>Top Rated TV Shows</h2>
        <div className="tvShowList">
          {loadingTopRatedTVShows ? <DualRingLoader /> : (
            <TvShowList 
              tvShows={topRatedTVShows} 
              isShowBtn={true}
              sortBy="vote_average.desc"
            />
          )}
        </div>
      </div>
    </div>
  )
}


export default TvShowsLayout