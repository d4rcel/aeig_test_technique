import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProjectResponse } from '@/types';

interface IProjectState {
  projects: IProjectResponse[] | null;
}

const initialState: IProjectState = {
  projects: [],
};

export const projectSlice = createSlice({
  initialState,
  name: 'projectSlice',
  reducers: {
    setProjects: (state, action: PayloadAction<IProjectResponse[]>) => {
      state.projects = action.payload;
    },
  },
});

export default projectSlice.reducer;

export const { setProjects } = projectSlice.actions;
