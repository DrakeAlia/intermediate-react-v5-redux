import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// This is the base query that we're going to use to make our API calls
// We're going to pass this into the createApi function
// This function is going to return an object with a bunch of properties
export const petApi = createApi({
    reducerPath: 'petApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://pets-v2.dev-apis.com/' }),
    endpoints: (builder) => ({
        getPet: builder.query({
            query: id => ({ url: "pets", params: { id } }),
            transformResponse: (response) => response.pets[0],
        }),
        // This is a query that we're going to use to get the list of breeds
        // for a particular animal
        getBreeds: builder.query({
            query: animal => ({ url: "breeds", params: { animal } }),
            transformResponse: (response) => response.breeds,
        }),
        // This is a query that we're going to use to search for pets
        // based on the search parameters
        search: builder.query({
            query: ({ animal, breed, location }) => ({
                url: "pets",
                params: { animal, breed, location },
            }),
            transformResponse: (response) => response.pets,
        }),
    }),
})

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi