import Link from 'next/link'
import { ChangeEvent, FormEvent, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'


const Navbar:FC = () => {
  const router = useRouter()
  const [t, setT] = useState<string>('movies')
  const [query, setQuery] = useState<string>('')
  const { loadingMovies, loadingMovie } = useTypedSelector(state => state.moviesReducer)
  const { loadingTVShows, loadingTVShow } = useTypedSelector(state => state.tvShowsReducer)
  const { changeSearchTitleMovies, changeSearchTitleTVShows } = useAction()

  const isActive = (url:string):string => url === router.pathname ? 'active' : ''

  const handleChange = (e:ChangeEvent<HTMLInputElement>):void => setQuery(e.target.value)

  const handleSelect = (e:ChangeEvent<HTMLSelectElement>):void => setT(e.target.value)

  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault()
    
    if(query.trim()) {
      if(t === 'movies') {
        changeSearchTitleMovies(query)
        router.push('/')
      }
      else {
        changeSearchTitleTVShows(query)
        router.push(`/${t}`)
      }
    }
  }


  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <Link href="/">
        <a className="navbar-brand">{'Movies & TV Shows'}</a>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse py-1 justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav align-items-md-center pr-2">
          <li className={`nav-item ${isActive('/tv')}`}>
            <Link href="/tv">
              <a className="nav-link">
                TV Shows
              </a>
            </Link>
          </li>
        </ul>

        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={(loadingMovies || loadingTVShows || loadingMovie || loadingTVShow) ? undefined : handleSubmit}
        >
          <div className="input-group">
            <div className="input-group-prepend">
              <select
                className="custom-select"
                value={t}
                onChange={handleSelect}
                disabled={loadingMovies || loadingTVShows || loadingMovie || loadingTVShow}
              >
                <option value="movies">Movies</option>
                <option value="tv">TV Shows</option>
              </select>
            </div>

            <input
              className="form-control"
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search"
              disabled={loadingMovies || loadingTVShows || loadingMovie || loadingTVShow}
            />
          </div>

          <button
            className="btn btn-info"
            type="submit"
            disabled={loadingMovies || loadingTVShows || loadingMovie || loadingTVShow || !query.trim()}
          >
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
