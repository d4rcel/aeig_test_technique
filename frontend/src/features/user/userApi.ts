import { setUser, setUsers } from '../user/userSlice';
import { IUser } from '@/types';
import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: 'users/me',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),

    getUsers: builder.query<IUser[], null>({
      query() {
        return {
          url: '/users',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { users: IUser[] } }) =>
        result.data.users,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          dispatch(setUsers(data));
        } catch (error) {}
      },
    }),
    
  }),
});
