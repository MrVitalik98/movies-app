import Head from 'next/head'
import { ChangeEvent, FC, useEffect, useLayoutEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useAction } from '../../hooks/useAction'
import { IFormState } from '../../interfaces'
import GridLoader from '../../components/loaders/GridLoader'
import Pagination from '../../components/Pagination'
import TvShowList from '../../components/TvShowList'
import MoviesLayout from '../../components/MoviesLayout'
import FilterForm from '../../components/FilterForm'


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


const TVShows:FC = () => {
  const [sortBy, setSortBy] = useState<string>('')
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [form, setForm] = useState<IFormState>(initialState)
  const [q, setQ] = useState<string>('')
  const { allTVShows, loadingTVShows, page, total_pages, total_results, query, sort_by } = useTypedSelector(state => state.tvShowsReducer)
  const { changeSearchTitleTVShows, sortTVShows, searchTVShow, getSortedTVShows, fetchAllTVShows } = useAction()


  useEffect(() => {
    if(query) {
      setQ(query)
      setForm(initialState)
      setIsFilter(false)
      setSortBy('')
      changeSearchTitleTVShows('')
    } 

    if(sort_by) {
      setForm({ ...form, sort_by })
      setSortBy(sort_by)
      sortTVShows('')
    }

  }, [form, query, sort_by])


  useEffect(() => {
    q && searchTVShow(1, q)
    sortBy && getSortedTVShows(1, { sort_by: sortBy })
    !q && !sortBy && !isFilter && fetchAllTVShows(1)
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
    getSortedTVShows(page, data)
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
    if(sortBy) getSortedTVShows(page, { sort_by: sortBy })
    else if(isFilter) handleSort(page)
    else if(q) searchTVShow(page, q)
    else fetchAllTVShows(page)
  }


  return (
    <>
      <Head>
        <title>Top Movies and TV Shows Stats</title>

        <script 
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2447053498638493"
          crossOrigin="anonymous">
        </script>
      </Head>

      <MoviesLayout>
        <div className="container tvShows">
          <div className="content">
            <h2>TV Shows</h2>
            <h5>Total Results - <kbd className="bg-info shadow font-weight">{total_results}</kbd></h5>
          </div>

          <FilterForm 
            isMovie={false} 
            form={form}
            handleSelect={handleSelect}
            handleSort={handleSort}
            handleChangeReleaseDate={handleChangeReleaseDate}
            handleChangeVoteAverage={handleChangeVoteAverage}
          />

          {loadingTVShows ? <GridLoader /> : (
            allTVShows?.length ? (
              <>
                <TvShowList 
                  tvShows={allTVShows} 
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
      </MoviesLayout>
    </>
  )
}

export default TVShows