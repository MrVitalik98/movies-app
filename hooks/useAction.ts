import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as movieActions from '../services/movies'
import * as genreActions from '../services/genres'
import * as tvShowActions from '../services/tvShows'
import { changeSearchTitleMovies, sortMovies } from '../store/features/movies/moviesSlice'
import { changeSearchTitleTVShows, sortTVShows } from '../store/features/tvShows/tvShowsSlice'
import { hidePlayer, showPlayer } from '../store/features/player/playerSlice'


export function useAction() {
  const dispatch = useDispatch()
  return bindActionCreators({
    ...movieActions,
    ...genreActions,
    ...tvShowActions,
    changeSearchTitleMovies,
    changeSearchTitleTVShows,
    sortTVShows, sortMovies,
    hidePlayer, showPlayer
  }, dispatch)
}