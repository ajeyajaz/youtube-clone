import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import queryReducer from './slices/query.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    query: queryReducer,
  },
})