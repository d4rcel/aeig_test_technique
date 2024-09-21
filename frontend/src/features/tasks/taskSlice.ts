import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksResponse } from '@/types';

interface ITaskState {
  tasks: TasksResponse[] | null;
}

const initialState: ITaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  initialState,
  name: 'taskSlice',
  reducers: {
    onLogout: () => initialState,
    setTasks: (state, action: PayloadAction<TasksResponse[]>) => {
      state.tasks = action.payload;
    },
  }
});

export default taskSlice.reducer;

export const { setTasks } = taskSlice.actions;
