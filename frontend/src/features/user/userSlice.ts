import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types';

interface IUserState {
  user: IUser | null;
  users: IUser[] | null
}

const initialState: IUserState = {
  user: null,
  users: null
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },

    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setUsers } = userSlice.actions;
