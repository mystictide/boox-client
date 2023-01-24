import { useEffect, useMemo, useState } from "react";
import { BsXOctagonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import Confirmation from "../../components/modals/confirmation";
import PhotoManager from "../../components/modals/photoManager";
import {
  ManageListing,
  reset,
  resetListing,
  UploadPhoto
} from "../../features/listing/listingSlice";

function ListingManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { user } = useSelector((state) => state.auth);
  const {
    listing,
    genres,
    isLoading,
    isSuccess,
    isPhotoUploaded,
    isError,
    message,
  } = useSelector((state) => state.listing);
  const [country, setCountry] = useState(
    listing ? { label: listing.Country } : ""
  );
  const [genre, setGenres] = useState(listing ? listing.Genre : "");

  const [confirmActive, setConfirmState] = useState(false);
  const [photoActive, setPhotoState] = useState(false);
  const [selectedID, setID] = useState(null);

  const countryOptions = useMemo(() => countryList().getData(), []);
  const genreOptions = useMemo(() => genres, []);
  const [formData, setFormData] = useState({
    id: listing ? listing.ID : "",
    title: listing ? listing.Title : "",
    author: listing ? listing.Author : "",
    edition: listing ? listing.Edition : "",
    country: listing ? listing.Country : "",
    city: listing ? listing.City : "",
    year: listing ? listing.Year : "",
    notes: listing ? listing.Notes : "",
  });

  const { title, author, edition, city, year, notes } = formData;

  useEffect(() => {
    return () => {
      dispatch(resetListing());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError && message !== "") {
      toast(message);
      dispatch(reset());
    }
    if (isSuccess && !state) {
      toast("Listing saved! You can now attach photos.");
      const section = document.querySelector("#photoSection");
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      dispatch(reset());
    }
    if (isPhotoUploaded) {
      toast("photo uploaded successfully!");
      dispatch(reset());
    }
  }, [user, listing, navigate, dispatch]);

  const onCountryChange = (value) => {
    setCountry(value);
  };

  const onGenreChange = (value) => {
    setGenres(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      entity: {
        id: listing ? listing.ID : null,
        title,
        country: country.label,
        city,
        author,
        edition,
        year,
        genre,
        notes,
      },
      token: user.Token,
    };
    dispatch(ManageListing(reqData));
  };

  const uploadPhoto = (reqData) => {
    dispatch(UploadPhoto(reqData)).then(() => setPhotoState(false));
  };

  const deletePhoto = () => {
    const reqData = {
      id: selectedID,
      listingid: listing.ID,
      token: user.Token,
    };
    // dispatch(DeletePhoto(reqData));
    setConfirmState(false);
    setID(null);
  };

  return (
    <>
      {!isLoading && user ? (
        <>
          <div className="content content-wrapper">
            <div className="h-items form-gap single">
              <div className="single r-gap-10">
                <section className="section-header t-margin-1">
                  <h3>
                    {title ? title : listing ? listing.Title : "New Listing"}
                  </h3>
                </section>
                <section className="section-forms">
                  <form
                    className="v-items r-gap-10 t-margin-1"
                    onSubmit={onSubmit}
                  >
                    <label>Listing Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title ? title : listing ? listing.Title : ""}
                      placeholder={"add a listing title for all to see"}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label>Author</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={author ? author : listing ? listing.Author : ""}
                      placeholder={"who wrote this book?"}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label>Edition</label>
                    <input
                      type="text"
                      id="edition"
                      name="edition"
                      value={edition ? edition : listing ? listing.Edition : ""}
                      placeholder={"add the edition information"}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label>Genres</label>
                    <Select
                      isMulti
                      className="select"
                      id="genres"
                      name="genres"
                      placeholder={"what genre is the book in?"}
                      options={genreOptions}
                      getOptionLabel={(options) => options["name"]}
                      getOptionValue={(options) => options["ID"]}
                      value={genre ? genre : listing ? listing.Genre : ""}
                      onChange={onGenreChange}
                    />
                    <label>Country</label>
                    <Select
                      className="select"
                      id="country"
                      name="country"
                      placeholder={"where do you live?"}
                      options={countryOptions}
                      getOptionLabel={(options) => options["label"]}
                      getOptionValue={(options) => options["value"]}
                      value={
                        country
                          ? country
                          : listing
                          ? { label: listing.Country }
                          : ""
                      }
                      onChange={onCountryChange}
                    />
                    <label>City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city ? city : listing ? listing.City : ""}
                      placeholder={"and in what city?"}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label>Year</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      value={year ? year : listing ? listing.Year : ""}
                      placeholder={"what year was this book released in?"}
                      min="1"
                      max="2023"
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <label>Notes</label>
                    <textarea
                      type="text"
                      id="notes"
                      name="notes"
                      value={notes ? notes : listing ? listing.Notes : ""}
                      placeholder={"add some notes about this book"}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                    <button className="btn-function">
                      Submit Listing & Add Photos
                    </button>
                  </form>
                </section>
              </div>
              {listing ? (
                <div className="single r-gap-10">
                  <section className="section-header t-margin-1">
                    <h3>Photos</h3>
                  </section>
                  <section className="section-forms" id="photoSection">
                    <ul className="h-list c-gap-10 r-gap-10 boxes">
                      {listing.photos
                        ? listing.photos.map((photo, index) => (
                            <li className="photo" key={index}>
                              <div className="photo-info">
                                <h4>photo</h4>
                              </div>
                              <div className="functions c-gap-10">
                                <button
                                  className="btn-remove"
                                  onClick={() => {
                                    setConfirmState(true);
                                  }}
                                >
                                  <BsXOctagonFill />
                                </button>
                              </div>
                            </li>
                          ))
                        : ""}

                      <li>
                        <div>
                          <button
                            className="btn-function"
                            onClick={() => {
                              setPhotoState(true);
                            }}
                          >
                            Add a new photo
                          </button>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {photoActive ? (
            <PhotoManager
              listing={listing}
              modalControl={setPhotoState}
              func={uploadPhoto}
            />
          ) : (
            ""
          )}
          {confirmActive ? (
            <Confirmation func={deletePhoto} modalControl={setConfirmState} />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ListingManager;
