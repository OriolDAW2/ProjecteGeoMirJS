import { configureStore } from '@reduxjs/toolkit'
import postmarksReducer from './slices/postMarkSlice'
import placesMarksReducer from './slices/placeMarkSlice'
import todosReducer from './slices/todoSlice'
import commentSlice from './slices/comments/commentSlice'
import postSlice from './slices/posts/postSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    postMarks: postmarksReducer,
    placeMarks: placesMarksReducer,
    comments: commentSlice,
    posts: postSlice

  },
})