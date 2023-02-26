import { createSlice } from "@reduxjs/toolkit";

// This is the slice that we're going to use to store the search parameters
// We're going to use this slice to store the location, breed, and animal
// that the user has selected
const searchParamsSlice = createSlice({
    name: "searchParams",
    initialState: {
        value: {
            location: "",
            breed: "",
            animal: "",
        },
    },
    // This is the reducer that we're going to use to update the state
    // We're going to use this reducer to update the state with the search parameters
    // that the user has selected
    reducers: {
        all: (state, action) => {
            state.value = action.payload
        }
    }
})

// This is the action that we're going to use to update the state
export const { all } = searchParamsSlice.actions
export default searchParamsSlice.reducer