import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IMovieVideo } from '../interfaces/movie'
import { useAction } from '../hooks/useAction'
import VideoPlayer from './VideoPlayer'
import GridLoader from './loaders/GridLoader'


const mapData = (arr: any[], key: string): string => {
  return arr?.map(a => a[key]).join(', ')
}

const numberFormat = (num:number): string => {
  return Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD'
  }).format(num)
}


const MovieDetails:FC = () => {
  const router = useRouter()
  const { showPlayer } = useAction()
  const [count, setCount] = useState<number>(10)
  const [videos, setVideos] = useState<IMovieVideo[]>()
  const { movie, loadingMovie } = useTypedSelector(state => state.moviesReducer)


  useEffect(() => {
    movie?.videos && setVideos(movie.videos.slice(0, count))
  }, [count, movie?.videos])
  
  useEffect(() => {
    !movie && router.push('/')
    setCount(10)
  }, [movie, router])


  const handleChangeCount = () => setCount(count => count += 10)


  return (
    <>
      <Head>
        <title>Top Movies and TV Shows Stats: {movie.title}</title>
        <script 
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2447053498638493"
          crossOrigin="anonymous">
        </script>
      </Head>
      
      <div className="container movie">
        {loadingMovie ? <GridLoader /> : (
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

            <div className="movie-details">
              <Image
                src={movie?.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/images.jpeg'}
                alt={movie?.original_title}
                width={350}
                height={350}
                className="rounded"
              />

              <div className="data">
                {movie ? (
                  <>
                    {movie?.overview ? <><p>{movie.overview}</p><br/></> : ''}
                    {movie?.title ? <p><b>Title:</b> {movie.title}</p> : ''}
                    {movie?.vote_average ? <p><b>Vote Average:</b> {movie?.vote_average}</p> : ''}
                    {movie?.production_countries?.length ? <p><b>Countries:</b> {mapData(movie.production_countries, 'name')}</p> : ''}
                    {movie?.release_date ? <p><b>Release Date:</b> {movie.release_date}</p> : ''}
                    {movie?.spoken_languages?.length ? <p><b>Spoken Languages:</b> {mapData(movie.spoken_languages, 'english_name')}</p> : ''}
                    {movie?.genres?.length ? <p><b>Genre:</b> {mapData(movie.genres, 'name')}</p> : ''}
                    {movie?.runtime ? <p><b>Runtime:</b> {movie.runtime} min</p> : ''}
                    {movie.budget ? <p><b>Budget:</b> {numberFormat(movie.budget)}</p> : ''}
                    {movie?.production_companies?.length ? <p><b>Company:</b> {mapData(movie.production_companies, 'name')}</p> : ''}
                    {movie?.cast?.length ? <p><b>Cast:</b> {mapData(movie.cast?.slice(0, 10), 'name')}</p> : ''}
                  </>
                ) : ''}
              </div>
            </div>

            {videos?.length ? (
              <>
                <h3>Videos:</h3>

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

                {count < movie?.videos?.length ? (
                  <div className="moreVideos">
                    <button 
                      className="btn"
                      onClick={handleChangeCount}
                    >
                      Show More
                    </button>
                  </div>
                ) : ''}
              </>
            ) : ''}

            <VideoPlayer />
          </>
        )}
      </div>
    </>
  )
}

export default MovieDetails