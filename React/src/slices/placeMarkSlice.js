import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    placeMarks: JSON.parse(localStorage.getItem("marksPlaces")) || [],
    isMarked: false
}

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