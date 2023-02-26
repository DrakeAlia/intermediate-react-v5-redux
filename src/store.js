import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import { petApi } from "./petApiService";
import searchParams from "./searchParamsSlice";

// This is the store that we're going to use in our app
// We're going to pass in an object with a reducer property
const store = configureStore({
    reducer: {
        adoptedPet,
        searchParams,
        [petApi.reducerPath]: petApi.reducer,
    },
    // We're adding the middleware that we created in petApiService.js
    // to the store
    // This is the same as doing:
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(petApi.middleware)
    // But it's a little bit more readable
    // middleware basically allows us to intercept actions before they get to the reducers
    // and do something with them
    // In this case, we're going to intercept the actions that are going to the petApi reducer
    // and we're going to do something with them
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(petApi.middleware),
})

export default store