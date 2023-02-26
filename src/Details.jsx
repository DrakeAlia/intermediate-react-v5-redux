import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetPetQuery } from "./petApiService";
import { adopt } from "./adoptedPetSlice";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";

// We're going to use the useParams hook to get the id from the URL
const Details = () => {
  // We're using the useParams hook to get the id from the URL
  const { id } = useParams();
  // We're using the useState hook to keep track of whether or not the modal is open
  const [showModal, setShowModal] = useState(false);
  // We're using the useNavigate hook to navigate to the home page
  const navigate = useNavigate();
  // We're using the useGetPetQuery hook to get the pet data
  const { isLoading, data: pet } = useGetPetQuery(id);
  // We're using the useDispatch hook to dispatch an action to the store
  const dispatch = useDispatch();

  // If the data is still loading, we're going to show a loading pane
  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  // If the data is not loading, we're going to show the results
  // We're using the Modal component to show the modal
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    // We're using the ErrorBoundary component to catch any errors that occur in the Details component
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
