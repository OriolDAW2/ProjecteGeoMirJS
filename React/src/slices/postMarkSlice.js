import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    postMarks: JSON.parse(localStorage.getItem("marksPosts")) || [],
    isMarked: false
}

export const postMarkSlice = createSlice({

    name: 'postMarks',
    initialState,
    reducers: {
        addpostmark: (state, action) => {
            state.postMarks.push(action.payload) // aqui podem fer push
            state.isMarked = true;

        },
        delpostmark: (state, action) => {
            state.postMarks = state.postMarks.filter(postMarks => postMarks.id !== action.payload)
        },
        ismarked: (state, action) => {
            state.isMarked = false
            state.postMarks.map((postMark) => {
                if (postMark.id == action.payload) { //id
                    state.isMarked = true;
                }
            })
        }
    }
})
export const { addpostmark, delpostmark, ismarked } = postMarkSlice.actions
const postsMarksReducer = postMarkSlice.reducer

export default postsMarksReducer