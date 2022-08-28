import { createSlice } from '@reduxjs/toolkit'

export const arrData = createSlice({
  name: 'counter',
  initialState: {
    arrData: [],
  },
  reducers: {
    addToArrData: (state, action) => {
      state.arrData.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToArrData } = arrData.actions

export default arrData.reducer
