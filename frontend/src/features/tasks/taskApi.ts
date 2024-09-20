import { IGetTaskResponse, ITaskRequest, ITaskResponse, TasksResponse } from '@/types';
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

    getTask: build.query<IGetTaskResponse, string>({
      query: (id) => ({
        url: `task/${id}`,
        method: "GET",
        credentials: 'include'
      }),
      providesTags: ['Task']
    }),

    getAllTasks: build.query<any, string>({
      query: (project) => ({
        url: "task/get-project-tasks",
        method: "POST",
        body: { project: project },
        credentials: 'include',
      }),
      providesTags: ['Task'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setTasks(data.data.tasks))
        } catch (error) { }
      }
    }),

    editTask: build.mutation<TasksResponse, { id: string; body: ITaskRequest }>({
      query: ({ id, body }) => ({
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

  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetAllTasksQuery,
  useGetTaskQuery,
} = taskApi;
