import { useGetBreedsQuery } from "./petApiService";

// This is a custom hook that we're going to use to get the list of breeds
// for a particular animal
export default function useBreedList(animal) {
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });
// if there is no animal, we don't want to make the request
  if (!animal) {
    // we want to return an empty array and the status
    return [[], 'loaded'];
  }
// otherwise, we want to return the breeds and the status
// if the query is still loading, we want to return the status as loading
  return [breeds ?? [], isLoading ? 'loading' : 'loaded'];
}
