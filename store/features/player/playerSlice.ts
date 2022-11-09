import { createSlice } from "@reduxjs/toolkit";
import { IPlayerState } from "../../../interfaces/player";


const initialState: IPlayerState = {
  isShow: false,
  data: {
    key: '',
    site: ''
  }
}


const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    showPlayer(state, { payload }):IPlayerState {
      return {
        isShow: true,
        data: { ...payload }
      }
    },
    hidePlayer(state):IPlayerState {
      return {
        isShow: false,
        data: {
          key: '',
          site: ''
        }
      }
    }
  }
})


// Export Actions
export const { showPlayer, hidePlayer } = playerSlice.actions

// Export Reducer
export default playerSlice.reducer