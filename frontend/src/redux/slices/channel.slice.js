import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannel: (state, action) => {
      return {...action.payload}
    },
  },
})

export const {setChannel} = channelSlice.actions

export default channelSlice.reducer