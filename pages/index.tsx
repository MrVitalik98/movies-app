import Head from 'next/head'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IFormState } from '../interfaces'
import { useAction } from '../hooks/useAction'
import GridLoader from '../components/loaders/GridLoader'
import MovieList from '../components/MovieList'
import Pagination from '../components/Pagination'
import TvShowsLayout from '../components/TvShowsLayout'
import FilterForm from '../components/FilterForm'


const initialState:IFormState = {
  sort_by: '',
  release_date: {
    from: '',
    to: ''
  },
  vote_average: {
    from: '',
    to: ''
  },
  with_genres: ''
}


const Movies:FC = () => {
  const [q, setQ] = useState<string>('')
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [form, setForm] = useState<IFormState>(initialState)
  const [sortBy, setSortBy] = useState<string>('')
  const { allMovies, loadingMovies, page, total_pages, total_results, query, sort_by } = useTypedSelector(state => state.moviesReducer)
  const { changeSearchTitleMovies, sortMovies, searchMovie, getSortedMovies, fetchAllMovies } = useAction()


  useEffect(():void => {
    if(query) {
      setQ(query)
      changeSearchTitleMovies('')
      setForm(initialState)
      setIsFilter(false)
      setSortBy('')
    } 

    if(sort_by) {
      setSortBy(sort_by)
      setForm({ ...form, sort_by })
      sortMovies('')
    }
  }, [form, query, sort_by])


  useEffect(():void => {
    q && searchMovie(1, q)
    sortBy && getSortedMovies(1, { sort_by: sortBy })
    !q && !sortBy && !isFilter && fetchAllMovies(1)
  }, [q, sortBy, isFilter])


  const handleSort = (page:number):void => {
    const data = {
      ...form,
      release_date: {
        from: form.release_date?.from && new Date(form.release_date?.from).toJSON().split('T')[0],
        to: form.release_date?.to && new Date(form.release_date?.to).toJSON().split('T')[0]
      }
    }

    setQ('')
    setSortBy('')
    getSortedMovies(page, data)
    setIsFilter(true)
  }


  const handleSelect = (e:ChangeEvent<HTMLSelectElement>):void => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }


  const handleChangeReleaseDate = (e:ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target

    setForm({
      ...form,
      release_date: {
        ...form.release_date,
        [name]: value
      }
    })
  }


  const handleChangeVoteAverage = (e:ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target

    setForm({
      ...form,
      vote_average: {
        ...form.vote_average,
        [name]: value
      }
    })
  }


  const handleChangeCurrentPage = (page: number):void => {
    if(sortBy) getSortedMovies(page, { sort_by: sortBy })
    else if(isFilter) handleSort(page)
    else if(q) searchMovie(page, q)
    else fetchAllMovies(page)
  }


  return (
    <>
      <Head>
      <title>Top Movies and TV Shows Stats</title>
      </Head>

      <TvShowsLayout>
        <div className="container movies">
          <div className="content">
            <h2>Movies</h2>
            <h5>Total Results - <kbd className="bg-info shadow font-weight">{total_results}</kbd></h5>
          </div>

          <FilterForm 
            isMovie={true} 
            form={form}
            handleSelect={handleSelect}
            handleSort={handleSort}
            handleChangeReleaseDate={handleChangeReleaseDate}
            handleChangeVoteAverage={handleChangeVoteAverage}
          />

          {loadingMovies ? <GridLoader /> : (
            allMovies?.length ? (
              <>
                <MovieList 
                  movies={allMovies} 
                  isShowBtn={false}
                />

                <Pagination 
                  currentPage={page}
                  total={total_pages}
                  changePage={handleChangeCurrentPage}
                />
              </>
            ) : <h6 className="text-center noData">Nothing found</h6>
          )}
        </div>
      </TvShowsLayout>
    </>
  )
}

export default Movies