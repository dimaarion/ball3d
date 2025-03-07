import { createSlice } from '@reduxjs/toolkit'



export const savePosition = createSlice({
    name: 'savePosition',
    initialState: {
        value: {x:0,y:0,z:0},
    },
    reducers: {
        incrementSave: (state,action) => {

        },

        decrementSave: (state) => {

        },

    },
})

// Action creators are generated for each case reducer function
export const {incrementSave, decrementSave} = savePosition.actions

export default savePosition.reducer