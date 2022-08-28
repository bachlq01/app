import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        value: {},
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setValue } = user.actions

export default user.reducer
