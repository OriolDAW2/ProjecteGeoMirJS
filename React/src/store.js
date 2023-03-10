import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todosSlice';
import postMarkSlice from './slices/postMarkSlice';

export const store = configureStore({
    reducer: {
        todos: todoSlice,
        marks: postMarkSlice
    },
})