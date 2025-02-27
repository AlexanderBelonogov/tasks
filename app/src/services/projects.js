import graphqlApi from './api'

import { gql } from "@apollo/client";
import client from "./apolloClient"; // Import the Apollo Client

const TASK_CREATED_SUBSCRIPTION = gql`
  subscription TaskCreated($projectId: ID!) {
    taskCreated(projectId: $projectId) {
      task {
        id
        name
      }
    }
  }
`;

export const PROJECTS_QUERY = gql`
  query Projects($page: Int!, $limit: Int!) {
    projects(page: $page, limit: $limit) {
      collection {
        id
        name
      }
      metadata {
        totalPages
        totalCount
        currentPage
        limitValue
      }
    }
  }
`;

export const PROJECT_TASKS_QUERY = gql`
  query Tasks($id: ID!, $page: Int!, $limit: Int!) {
    tasks(id: $id, page: $page, limit: $limit) {
      collection {
        id
        name
      }
      metadata {
        totalPages
        totalCount
        currentPage
        limitValue
      }
    }
  }
`;


const projectsApi = graphqlApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (page = 1, limit = 10) => ({
        document: PROJECTS_QUERY,
        variables: {
          page,
          limit,
        },
      }),
      providesTags: ['Projects'],
    }),
    getProjectTasks: builder.query({
      query: ({ id, page = 1, limit = 100 }) => ({
        document: PROJECT_TASKS_QUERY,
        variables: {
          id,
          page,
          limit,
        },
      }),
      providesTags: ['ProjectTasks'],
    }),
    subscribeToTaskCreated: builder.query({
      queryFn: async ({ id }, { dispatch }) => {
        const observable = client.subscribe({
          query: TASK_CREATED_SUBSCRIPTION,
          variables: { projectId: id }
        }).subscribe({
          next(result) {
            if (result?.data?.taskCreated?.task) {
              dispatch(graphqlApi.util.invalidateTags(['ProjectTasks']))
              // dispatch(graphqlApi.util.updateQueryData(
              //   'getProjectTasks',
              //   { id },
              //   (draft) => { draft.tasks?.collection?.push(result.data.taskCreated.task) }
              // ));
            }
          },
          error(err) { console.error('err', err); },
        });
      },
    }),
  }),
  overrideExisting: true,
})

export const { useGetProjectsQuery, useSubscribeToTaskCreatedQuery, useGetProjectTasksQuery } = projectsApi
