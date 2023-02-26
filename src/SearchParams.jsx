import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchQuery } from "./petApiService";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { all } from "./searchParamsSlice";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

// This is a functional component that we're going to use to render the search form
// We're going to use the useSelector hook to pull out the adoptedPet and searchParams
// from the store
const SearchParams = () => {
  // Make sure that you're only pulling out the bare minimum amount of data that you absolutely need for this 
  // particular component. Do NOT pull out unnecessary data
  const adoptedPet = useSelector((state) => state.adoptedPet.value)
  const searchParams = useSelector(state => state.searchParams.value)
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();
  // We're using the useSearchQuery hook from the petApiService.js file
  // redux is going to automatically call this hook for us
  let {data: pets } = useSearchQuery(searchParams)
  // If the data is still loading, we're going to show a loading pane
  // If the data is not loading, we're going to show the results
  pets = pets ?? []

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
