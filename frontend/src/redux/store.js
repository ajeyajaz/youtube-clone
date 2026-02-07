import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import queryReducer from './slices/query.slice'
import channelReducer from './slices/channel.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    query: queryReducer,
    channel: channelReducer
  },
})