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

    getAllProjects: build.query<ProjectsResponse, any>({
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

    editProject: build.mutation<ProjectsResponse, { id: number; body: any }>({
      query: ({id, body}) => ({
        url: `project/${id}`,
        method: "PATCH",
        body,
        credentials: 'include'
      }),
      invalidatesTags: ['Project']
    }),

    deleteProject: build.mutation<any, number>({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
        credentials: 'include'
      }),
      invalidatesTags: ['Project']
    }),

    // logoutUser: builder.mutation<void, void>({
    //   query() {
    //     return {
    //       url: 'project',
    //       credentials: 'include',
    //     };
    //   },
    // })
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} = projectApi;
