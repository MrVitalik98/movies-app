import { FC, useEffect } from 'react'
import MovieDetails from '../../components/MovieDetails'
import TvShowsLayout from '../../components/TvShowsLayout'
import { useAction } from '../../hooks/useAction'


interface IProps {
  movieID: number
}

interface IQuery {
  query: {
    id: number
  }
}


export async function getServerSideProps({ query }: IQuery) {
  return {
    props: {
      movieID: query.id
    }
  }
}

const Movie:FC<IProps> = ({ movieID }) => {
  const { fetchMovieByID } = useAction()

  useEffect(() => {
    fetchMovieByID(movieID)
  }, [movieID])


  return (
    <TvShowsLayout>
      <MovieDetails />
    </TvShowsLayout>
  )
}

export default Movie