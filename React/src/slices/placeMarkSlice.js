import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    placeMarks: JSON.parse(localStorage.getItem("marksPlaces")) || [],
    isMarked: false
}

/**
 * A Redux slice for managing place markers.
 *
 * @typedef {Object} PlaceMarkSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers of the slice.
 * @property {Function} reducers.addplacemark - Adds a place marker to the state.
 * @property {Function} reducers.delplacemark - Deletes a place marker from the state.
 * @property {Function} reducers.ismarked - Checks if a place marker is marked.
 */

/**
 * The initial state of the slice.
 *
 * @typedef {Object} PlaceMarkState
 * @property {boolean} isMarked - Indicates whether any place marker is marked.
 * @property {Object[]} placeMarks - The place markers.
 * @property {number} placeMarks[].id - The unique identifier of the place marker.
 */

/**
 * The initial state of the slice.
 *
 * @type {PlaceMarkState}
 */

export const placeMarkSlice = createSlice({

    name: 'placeMarks',
    initialState,
    reducers: {
        addplacemark: (state, action) => {
            state.placeMarks.push(action.payload) // aqui podem fer push
            state.isMarked = true;

        },
        delplacemark: (state, action) => {
            state.placeMarks = state.placeMarks.filter(placeMarks => placeMarks.id !== action.payload)
        },
        ismarked: (state, action) => {
            state.isMarked = false
            state.placeMarks.map((placeMark) => {
                if (placeMark.id == action.payload) { //id
                    state.isMarked = true;
                }
            })
        }
    }
})
export const { addplacemark, delplacemark, ismarked } = placeMarkSlice.actions
const placesMarksReducer = placeMarkSlice.reducer

export default placesMarksReducer