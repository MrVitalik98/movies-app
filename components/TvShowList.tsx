import { useRouter } from 'next/router'
import { FC } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import { ITV } from '../interfaces/tvShow'
import { useAction } from '../hooks/useAction'
import TvShowItem from './TvShowItem'


interface IProps {
  tvShows: ITV[]
  isShowBtn: boolean
  sortBy?: string
}


const TvShowList:FC<IProps> = ({ tvShows, isShowBtn, sortBy }) => {
  const router = useRouter()
  const { sortTVShows } = useAction()


  const showSortedTVShows = ():void => {
    sortTVShows(sortBy)
    router.push('/tv')
  }


  return (
    tvShows.length ? (
      <div className="cards">
        {tvShows?.map(tvShow => {
          return <TvShowItem key={tvShow.id} tvShow={tvShow} />
        })}

        {isShowBtn ? (
          <div className="more">
            <button className="btn" onClick={showSortedTVShows}>
              <span>More</span>
              <FontAwesomeIcon icon={faArrowCircleRight}></FontAwesomeIcon>
            </button>
          </div>
        ) : null}
      </div>
    ) : null
  )
}

export default TvShowList