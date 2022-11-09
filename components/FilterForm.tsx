import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IFormState } from '../interfaces'
import { IGenre } from '../interfaces/genre'
import { useAction } from '../hooks/useAction'


interface IProps {
  isMovie: boolean
  form: IFormState
  handleSort: (page:number) => void
  handleSelect: (e:ChangeEvent<HTMLSelectElement>) => void
  handleChangeVoteAverage: (e:ChangeEvent<HTMLInputElement>) => void
  handleChangeReleaseDate: (e:ChangeEvent<HTMLInputElement>) => void
}


const FilterForm:FC<IProps> = ({ isMovie, form, handleSort, handleSelect, handleChangeVoteAverage, handleChangeReleaseDate }) => {
  const [genres, setGenres] = useState<IGenre[]>([])
  const { loadingMovies } = useTypedSelector(state => state.moviesReducer)
  const { loadingTVShows } = useTypedSelector(state => state.tvShowsReducer)
  const { movieGenres, tvGenres } = useTypedSelector(state => state.genresReducer)
  const { fetchAllMovieGenres, fetchAllTVGenres } = useAction()


  useEffect(() => {
    setGenres(isMovie ? movieGenres : tvGenres)
  }, [isMovie, movieGenres, tvGenres])


  useEffect(():void => {
    isMovie ? fetchAllMovieGenres() : fetchAllTVGenres()
  }, [isMovie])


  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    handleSort(1)
  }


  return (
    <form 
      id="filterForm"
      onSubmit={(loadingMovies || loadingTVShows) ? undefined : handleSubmit} 
    >
      <div className="row">
        <div className="form-group col-md-5 col-12">
          <label htmlFor="sortBy">Sort by:</label>
          <select 
            className="custom-select"
            name="sort_by"
            id="sortBy"
            value={form.sort_by}
            onChange={handleSelect}
            disabled={loadingMovies || loadingTVShows}
          >
            <option value="">Default</option>
            <option value="popularity.desc">Popularity</option>
            <option value={isMovie ? "vote_count.desc" : "vote_average.desc"}>Rating</option>
            <option value="release_date.desc">Release date</option>
          </select>
        </div>

        <div className="form-group col-md-7 col-12">
          <label htmlFor="genres">Genre:</label>
          <select 
            className="custom-select"
            name="with_genres"
            id="genres"
            value={form.with_genres}
            onChange={handleSelect}
            disabled={loadingMovies || loadingTVShows}
          >
            <option value="">All</option>
            {genres?.map(genre => {
              return <option key={genre.id} value={genre.id}>{genre.name}</option>
            })}
          </select>
        </div>

        <div className="form-group col-12 col-md-6" id="releaseDate">
          <label>Release date:</label>
          <input 
            type="number"
            className="form-control"
            placeholder="from"
            name="from"
            value={form.release_date?.from?.toString()}
            onChange={handleChangeReleaseDate}
            disabled={loadingMovies || loadingTVShows}
          />
          -
          <input 
            type="number" 
            className="form-control"
            placeholder="to"
            name="to" 
            value={form.release_date?.to?.toString()}
            onChange={handleChangeReleaseDate}
            disabled={loadingMovies || loadingTVShows}
          />
        </div> 

        <div className="form-group col-12 col-md-6" id="voteAverage">
          <label>Vote average:</label>
          <input 
            type="number"
            className="form-control"
            placeholder="from"
            name="from"
            min={0}
            max={10}
            value={form.vote_average?.from?.toString()}
            onChange={handleChangeVoteAverage}
            disabled={loadingMovies || loadingTVShows}
          />
          -
          <input 
            type="number" 
            className="form-control"
            placeholder="to"
            name="to" 
            min={0}
            max={10}
            value={form.vote_average?.to?.toString()}
            onChange={handleChangeVoteAverage}
            disabled={loadingMovies || loadingTVShows}
          />
        </div> 
      </div>

      <button 
        type="submit"
        className="btn shadow float-right"
        disabled={loadingMovies || loadingTVShows}
      >
        <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
        Filter
      </button>
    </form>
  )
}


export default FilterForm