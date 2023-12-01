import Image from 'next/image'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IMovieVideo } from '../interfaces/movie'
import { useAction } from '../hooks/useAction'
import { IEpisodeData, ISeason } from '../interfaces/tvShow'
import VideoPlayer from './VideoPlayer'
import GridLoader from './loaders/GridLoader'
import DualRingLoader from './loaders/DualRingLoader'


const mapData = (arr: any[], key: string): string => {
  return arr?.map(a => a[key]).join(', ')
}


const TvShowDetails:FC = () => {
  const router = useRouter()
  const [count, setCount] = useState<number>(10)
  const [videos, setVideos] = useState<IMovieVideo[]>()
  const [seasons, setSeasons] = useState<ISeason[]>([])
  const [episodes, setEpisodes] = useState<IEpisodeData[]>()
  const [activeSeason, setActiveSeason] = useState<number>(0)
  const [activeEpisode, setActiveEpisode] = useState<number>(0)
  const { tvShow, loadingTVShow, loadingSeason, loadingEpisode } = useTypedSelector(state => state.tvShowsReducer)
  const { fetchSeasonById, fetchEpisodeById, showPlayer } = useAction()

  useEffect(() => {
    const mapSeasons:ISeason[] = tvShow?.seasons?.filter((season:ISeason):boolean => season.name !== 'Specials')
    setSeasons(mapSeasons)
  }, [tvShow?.seasons])

  useEffect(() => {
    seasons?.length && fetchSeasonById(tvShow.id, seasons[activeSeason].season_number)
  }, [activeSeason, seasons, tvShow?.id])

  useEffect(() => {
    tvShow?.season?.episodes && setEpisodes(tvShow?.season?.episodes)
  }, [tvShow?.season?.episodes])

  useEffect(() => {
    episodes?.length && fetchEpisodeById(tvShow.id, tvShow?.season?.season_number, episodes[activeEpisode].episode_number)
  }, [activeEpisode, episodes, tvShow?.id, tvShow?.season?.season_number])

  useEffect(() => {
    tvShow?.season?.videos && setVideos(tvShow.season?.videos?.slice(0, count))
  }, [count, tvShow?.season?.videos])
  
  useEffect(() => {
    !tvShow && router.push('/')
    setCount(10)
  }, [tvShow, router])


  const handleSelectSeason = (idx:number):void => {
    setActiveSeason(idx)
    setActiveEpisode(0)
  }

  const handleChangeCount = () => setCount(count => count += 10)


  return (
    <>
      <Head>
        <title>Top Movies and TV Shows Stats: {tvShow.name}</title>
        <script 
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2447053498638493"
          crossOrigin="anonymous">
        </script>
      </Head>
      
      <div className="container tvShow">
        {loadingTVShow ? <GridLoader /> : (
          <>
            <div className="content">
              <button 
                className="btn bg-light"
                onClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                <span>Go Back</span>
              </button>
            </div>

            <div className="tvShow-details">
              <Image
                src={tvShow?.poster_path ? `https://image.tmdb.org/t/p/original/${tvShow.poster_path}` : '/images.jpeg'}
                alt={tvShow?.original_name}
                width={350}
                height={350}
                className="rounded"
              />

              <div className="data">
                {tvShow ? (
                  <>
                    <p>{tvShow.overview}</p><br/>
                    {tvShow?.name ? <p><b>Name:</b> {tvShow.name}</p> : ''}
                    {tvShow?.status ? <p><b>Status:</b> {tvShow.status}</p> : ''}
                    {tvShow?.vote_average ? <p><b>Vote Average:</b> {tvShow?.vote_average}</p> : ''}
                    {tvShow?.first_air_date ? <p><b>Dates:</b> {tvShow.first_air_date} - {tvShow.last_air_date}</p> : ''}
                    {tvShow?.spoken_languages?.length ? <p><b>Spoken Languages:</b> {mapData(tvShow.spoken_languages, 'english_name')}</p> : ''}
                    {tvShow?.genres ? <p><b>Genre:</b> {mapData(tvShow.genres, 'name')}</p> : ''}
                    {tvShow?.episode_run_time?.length ? <p><b>Episode run time:</b> {Math.min(...tvShow.episode_run_time)} min</p> : ''}
                    {tvShow?.created_by ? <p><b>Created by:</b> {mapData(tvShow.created_by, 'name')}</p> : ''}
                    {tvShow?.production_companies?.length ? <p><b>Company:</b> {mapData(tvShow.production_companies, 'name')}</p> : ''}
                    {tvShow?.cast?.length ? <p><b>Cast:</b> {mapData(tvShow.cast?.slice(0, 10), 'name')}</p> : ''}
                  </>
                ) : ''}
              </div>
            </div>

            {seasons?.length ? (
              <>
                <h3>Seasons:</h3>

                <div className="list-season">
                  {seasons?.map((season: ISeason, idx: number) => {
                    return (
                      <button 
                        key={season.id}
                        className={`btn ${activeSeason === idx ? 'active' : ''}`}
                        onClick={() => handleSelectSeason(idx)}
                      >
                        {season.name}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : ''}
            
            <div className="season-data">
              {loadingSeason ? <DualRingLoader /> : (
                <>
                  <h3 className="season-number">{tvShow?.season?.name}</h3>

                  <div className="season">
                    <div className="top-col">
                      {tvShow?.season?.poster_path ? (
                        <div className="season-img">
                          <Image
                            width={200}
                            height={200}
                            src={tvShow?.season?.poster_path ? `https://image.tmdb.org/t/p/original/${tvShow?.season.poster_path}` : '/images.jpeg'}
                            alt={tvShow?.season?.name}
                          />
                        </div>
                      ) : ''}

                      <div className="data">
                        {tvShow?.season?.overview ? <><p>{tvShow?.season?.overview}</p><br /></> : ''}
                        {tvShow?.season?.air_date ? <p><b>Air date:</b> {tvShow?.season?.air_date}</p> : ''}
                        {tvShow?.season?.cast?.length ? <p><b>Cast: </b> {mapData(tvShow?.season?.cast.slice(0, 10), 'name')}</p> : ''}
                      </div>
                    </div>

                    {episodes?.length ? (
                      <div className="bottom-col">
                        <h5>Episodes:</h5>

                        <div className="list-episode">
                          {episodes?.map((episode: IEpisodeData, idx: number) => {
                            return (
                              <button 
                                key={episode.id}
                                className={`btn ${activeEpisode === idx ? 'active' : ''}`}
                                onClick={() => setActiveEpisode(idx)}
                              >
                                #{episode.episode_number}.{episode.name}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : ''}
                  </div>

                  <div className="episode-data">
                    {loadingEpisode ? <DualRingLoader /> : (
                      <div className="episode">
                        <h3 className="episode-number">Episode {tvShow?.episode?.episode_number}</h3>

                        <div className="top-col">
                          <div className="data">
                            {tvShow?.episode?.name ? <h4 className="episode-name">{tvShow?.episode?.name}</h4> : ''}
                            {tvShow?.episode?.overview ? <><p>{tvShow?.episode?.overview}</p><br/></> : ''}
                            {tvShow?.episode?.air_date ? <p><b>Air date:</b> {tvShow?.episode?.air_date}</p> : ''}
                            {tvShow?.episode?.vote_average ? <p><b>Vote average:</b> {tvShow?.episode?.vote_average}</p> : ''}
                            {tvShow?.episode?.guest_stars?.length ? <p><b>Guest starts: </b> {mapData(tvShow?.episode?.guest_stars?.slice(0, 10), 'name')}</p> : ''}
                          </div>

                          {tvShow?.episode?.still_path ? (
                            <div className="episode-img">
                              <Image
                                width={150}
                                height={150}
                                src={tvShow?.episode?.still_path ? `https://image.tmdb.org/t/p/original/${tvShow?.episode.still_path}` : '/images.jpeg'}
                                alt={tvShow?.episode?.name}
                              />
                            </div>
                          ) : ''}
                        </div>

                        {videos?.length ? (
                          <div>
                            <h4>Videos:</h4>

                            <div className="list-group">
                              {videos?.map(v => {
                                return (
                                  <div key={v.id} className="shadow">
                                    <p className="p-0 m-0">{v.name}</p>
                                    <button 
                                      className="btn"
                                      onClick={() => showPlayer({ key: v.key, site: v.site })}
                                    >
                                      <FontAwesomeIcon className="text-danger" icon={faPlayCircle}></FontAwesomeIcon>
                                    </button>
                                  </div>
                                )
                              })}
                            </div>

                            {count < tvShow?.season?.videos?.length ? (
                              <div className="moreVideos">
                                <button 
                                  className="btn"
                                  onClick={handleChangeCount}
                                >
                                  Show More
                                </button>
                              </div>
                            ) : ''}
                          </div>
                        ) : ''}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <VideoPlayer />
          </>
        )}
      </div>
    </>
  )
}

export default TvShowDetails