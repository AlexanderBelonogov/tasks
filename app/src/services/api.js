import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

const { REACT_APP_GRAPHQL_URL = 'http://localhost:3000/graphql' } = process.env

export default createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: REACT_APP_GRAPHQL_URL,
  }),
  endpoints: () => ({}),
  tagTypes: ['Projects', 'ProjectTasks']
})
