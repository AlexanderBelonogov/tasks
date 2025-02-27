import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'

// import socketMiddleware from './socketMiddleware'

import graphqlApi from './services/api'

const middlewares = [
  // socketMiddleware,
  graphqlApi.middleware,
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export default configureStore({
  reducer: {
    [graphqlApi.reducerPath]: graphqlApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middlewares),
  devTools: process.env.NODE_ENV === 'development',
})
