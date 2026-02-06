import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const querSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
})

export const {setSearch, setCategory} = querSlice.actions

export default querSlice.reducer