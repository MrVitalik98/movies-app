import { FC, useEffect } from 'react'
import MoviesLayout from '../../components/MoviesLayout'
import TvShowDetails from '../../components/TvShowDetails'
import { useAction } from '../../hooks/useAction'


interface IProps {
  tvShowId: number
}

interface IQuery {
  query: {
    id: number
  }
}


export async function getServerSideProps({ query }: IQuery) {
  return {
    props: {
      tvShowId: query.id
    }
  }
}

const TvShow:FC<IProps> = ({ tvShowId }) => {
  const { fetchTVShowById } = useAction()

  useEffect(() => {
    fetchTVShowById(tvShowId)
  }, [tvShowId])


  return (
    <MoviesLayout>
      <TvShowDetails />
    </MoviesLayout>
  )
}

export default TvShow