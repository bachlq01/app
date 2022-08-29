import { createSlice } from '@reduxjs/toolkit'

export const loadVideo = createSlice({
    name: 'loadVideo',
    initialState: {
        value: false,
    },
    reducers: {
        setLoad: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoad } = loadVideo.actions

export default loadVideo.reducer
