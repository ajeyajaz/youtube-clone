import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search : '',
  category: null
}

export const querSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.category = null;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
})

export const {setSearch, setCategory} = querSlice.actions

export default querSlice.reducer