import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {},
    reducers: {
        cacheResults: (state, action) => {
            // state = { ...action.payload, ...state};   //JS ES6 spread operator
            state = Object.assign(state, action.payload);   //Merge 2 objects in JS 
        },
    },
});

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;