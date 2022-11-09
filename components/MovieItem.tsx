import { FC } from 'react'
import { IMovieProps } from '../interfaces/movie'
import { useRouter } from 'next/router'
import Image from 'next/image'


const getYear = (date:string):number => new Date(date).getFullYear()

const numberFormat = (num:number):string => {
  return Intl.NumberFormat('en', {
    minimumSignificantDigits: 2
  }).format(num)
}


const MovieItem:FC<IMovieProps> = ({ movie }) => {
  const router = useRouter()

  const textStyle = (n:number) => {
    if(n >= 8) {
      return 'b0'
    }

    if(n >= 7 && n < 8) {
      return 'b1'
    }

    if(n >= 6 && n < 7) {
      return 'b2'
    }

    if(n >= 5 && n < 6) {
      return 'b3'
    }

    return 'b4'
  }


  return (
    <div 
      className="card shadow"
      onClick={() => router.push(`/movie/${movie.id}`)}
    >
      <Image
        width={250}
        height={240}
        className="card-img-top" 
        src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/images.jpeg'} 
        alt={movie.original_title}
      />

      <div className="card-body">
        <h3 className="card-title">
          {movie.title} {movie.release_date && `(${getYear(movie.release_date)})`}
        </h3>

        {movie.vote_average ? (
          <kbd className={`${textStyle(movie.vote_average)}`}>
            {numberFormat(movie.vote_average)}
          </kbd>
        ) : ''}
      </div>
    </div>
  )
}

export default MovieItem