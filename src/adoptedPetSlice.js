import { createSlice } from "@reduxjs/toolkit";

// Anything you do to modify the apdotedPet would go into this reducers array down below

export const adoptedPetSlice = createSlice({
    name: "adoptedPet",
    initialState: {
        value: null
    },
    reducers: {
        adopt: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { adpot } = adoptedPetSlice.actions
export default adoptedPetSlice.reducer