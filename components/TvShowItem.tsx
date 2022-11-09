import { FC } from 'react'
import Image from 'next/image'
import { ITVProps } from '../interfaces/tvShow'
import { useRouter } from 'next/router'


const getYear = (date:string):number => new Date(date).getFullYear()

const numberFormat = (num:number):string => {
  return Intl.NumberFormat('en', {
    minimumSignificantDigits: 2
  }).format(num)
}


const TvShowItem:FC<ITVProps> = ({ tvShow }) => {
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
      onClick={() => router.push(`/tv/${tvShow.id}`)}
    >
      <Image
        width={250} 
        height={240}
        className="card-img-top" 
        src={tvShow.poster_path ? `https://image.tmdb.org/t/p/original/${tvShow.poster_path}` : '/images.jpeg'}
        alt={tvShow.original_name}
      />

      <div className="card-body">
        <h3 className="card-title">
          {tvShow.name} {tvShow.first_air_date && `(${getYear(tvShow.first_air_date)})`}
        </h3>

        {tvShow.vote_average ? (
          <kbd className={`${textStyle(tvShow.vote_average)}`}>
            {numberFormat(tvShow.vote_average)}
          </kbd>
        ) : ''}
      </div>
    </div>
  )
}

export default TvShowItem