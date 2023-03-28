import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    post: {
        file: { filepath:""},
        author: { name:""},
        body: "",
        visibility: "",
        latitude: 0,
        longitude: 0,
    },
    page: 0,
    isLoading: false,
    likes: 0,
    liked: false,
    error: "",
}

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        startLoadingPosts: (state) => {
            state.isLoading = true;
        },

        setPosts: (state, action ) => {
            state.posts = action.payload
            state.isLoading = false
        },

        setPost: (state, action ) => {
            state.post = action.payload
            state.isLoading = false
        },

        setLikes: (state, action ) => {
            state.likes = action.payload
        },

        setLiked: (state, action ) => {
            state.liked = action.payload
        },

        setError: (state,action) => {
            state.error = action.payload
        },
    }
});

export const { startLoadingPosts, setPosts, setPost, setLikes, setLiked, setError } = postSlice.actions;
export default postSlice.reducer