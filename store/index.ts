import { combineReducers, configureStore } from '@reduxjs/toolkit'
import moviesReducer from './features/movies/moviesSlice'
import genresReducer from './features/genres/genresSlice'
import tvShowsReducer from './features/tvShows/tvShowsSlice'
import playerReducer from './features/player/playerSlice'


const rootReducer = combineReducers({
  moviesReducer,
  genresReducer,
  tvShowsReducer,
  playerReducer
})


export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({ 
      serializableCheck: false,
      immutableCheck: false
    })
})

export type TReducer = ReturnType<typeof rootReducer>