import { createSlice } from '@reduxjs/toolkit'

/**
 * A Redux slice for managing post marks.
 *
 * @typedef {Object} PostMarkSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers of the slice.
 * @property {Function} reducers.addpostmark - Adds a post mark to the state.
 * @property {Function} reducers.delpostmark - Deletes a post mark from the state.
 * @property {Function} reducers.ismarked - Checks if a post mark is marked.
 */

/**
 * The initial state of the slice.
 *
 * @typedef {Object} PostMarkState
 * @property {boolean} isMarked - Indicates whether any post mark is marked.
 * @property {Object[]} postMarks - The post marks.
 * @property {number} postMarks[].id - The unique identifier of the post mark.
 */

/**
 * The initial state of the slice.
 *
 * @type {PostMarkState}
 */
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