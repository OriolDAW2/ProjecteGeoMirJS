import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    marks: JSON.parse(localStorage.getItem("marks")) || [] ,
    isMarked: false
}
export const postMarkSlice = createSlice({
    name: 'marks',
    initialState,
    reducers: {
        addmark: (state, action) => {
            state.marks.push(action.payload) // aqui podem fer push
            state.isMarked = true;
        },
        
        delmark: (state,action) => {
            state.marks = state.marks.filter( mark => mark.id !== action.payload)
        },

        ismarked: (state, action) => {
            state.isMarked = false
            state.marks.map ((mark)=> {
                if (mark.id == action.payload) { //id
                    state.isMarked = true; // invertim el isMarked
                }
            })
        },
    }
})

export const { addmark, delmark, ismarked } = postMarkSlice.actions;
export default postMarkSlice.reducer;