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
    removeArr: (state, action) => {
      state.arrData=[];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToArrData ,removeArr} = arrData.actions

export default arrData.reducer
