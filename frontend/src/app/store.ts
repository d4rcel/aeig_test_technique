import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from '../features/api/apiSlice'
import userReducer from '../features/user/userSlice'
import projectReducer from '../features/project/projectSlice'
import taskReducer from '../features/tasks/taskSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        projects: projectReducer,
        tasks: taskReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})

// setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>