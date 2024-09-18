import { ITaskRequest, ITaskResponse, IUser, TasksResponse } from '@/types';
import { apiSlice } from '../api/apiSlice';
import { setTasks } from './taskSlice';

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<ITaskResponse, ITaskRequest>({
      query: (data) => ({
          url: 'task',
          method: 'POST',
          credentials: 'include',
          body: data,
        }),
        invalidatesTags: ['Task']
    }),

    getTask: build.mutation<any, string>({
      query: (id) => ({
        url: `task/${id}`,
        method: "GET",
        credentials: 'include'
      })
    }),

    getAllTasks: build.mutation<TasksResponse, string>({
        query: (project) => ({
          url: "task/get-project-tasks",
          method: "POST",
          body: {project},
          credentials: 'include',
        }),
        invalidatesTags: ['Task'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            
            dispatch(setTasks(data.data.tasks))
          } catch (error) { }
        }
      }),

    editTask: build.mutation<TasksResponse, { id: string; body: ITaskRequest }>({
      query: ({id, body}) => ({
        url: `task/${id}`,
        method: "PATCH",
        body: body,
        credentials: 'include'
      }),
      invalidatesTags: ['Task']
    }),

    deleteTask: build.mutation<any, string>({
      query: (id) => ({
        url: `task/${id}`,
        method: "DELETE",
        credentials: 'include'
      }),
      invalidatesTags: ['Task']
    }),

    getUsers: build.query<any, any>({
      query: () => ({
        url: "users",
        method: "GET",
        credentials: 'include'
      })
    }),

  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetAllTasksMutation,
  useGetTaskMutation,
  useGetUsersQuery
} = taskApi;
