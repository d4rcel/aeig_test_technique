import { IProjectRequest, IProjectResponse, ProjectsResponse } from '@/types';
import { apiSlice } from '../api/apiSlice';
import { setProjects } from './projectSlice';

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<IProjectResponse, IProjectRequest>({
      query: (data) => ({
          url: 'project',
          method: 'POST',
          credentials: 'include',
          body: data,
        }),
        invalidatesTags: ['Project']
    }),

    getProject: build.mutation<any, string>({
      query: (id) => ({
        url: `project/${id}`,
        method: "GET",
        credentials: 'include'
      })
    }),

    getAllProjects: build.query<ProjectsResponse[], any>({
        query: () => ({
          url: "project",
          method: "GET",
          credentials: 'include',
        }),
        providesTags: ['Project'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            
            dispatch(setProjects(data.data.projects))
          } catch (error) { }
        }
      }),

    editProject: build.mutation<ProjectsResponse, { id: string; body: IProjectRequest }>({
      query: ({id, body}) => ({
        url: `project/${id}`,
        method: "PATCH",
        body: body,
        credentials: 'include'
      }),
      invalidatesTags: ['Project']
    }),

    deleteProject: build.mutation<any, string>({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
        credentials: 'include'
      }),
      invalidatesTags: ['Project']
    }),

  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  useEditProjectMutation,
  useGetProjectMutation
} = projectApi;
