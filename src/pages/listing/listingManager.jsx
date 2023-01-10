import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  ManageListing,
  reset,
  UploadPhoto,
} from "../../features/listing/listingSlice";
import countryList from "react-select-country-list";
import { BsXOctagonFill } from "react-icons/bs";
import PhotoManager from "../../components/modals/photoManager";
import Confirmation from "../../components/modals/confirmation";

function ListingManager({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { listing, genres, isSuccess, isPhotoUploaded, isError, message } =
    useSelector((state) => state.listing);
  const [country, setCountry] = useState(item ? { label: item.country } : "");
  const [genre, setGenres] = useState(item ? { label: item.genres } : "");

  const [confirmActive, setConfirmState] = useState(false);
  const [photoActive, setPhotoState] = useState(false);
  const [selectedID, setID] = useState(null);

  const countryOptions = useMemo(() => countryList().getData(), []);
  const genreOptions = useMemo(() => genres, []);
  const [formData, setFormData] = useState({
    id: item ? item.ID : "",
    title: item ? item.title : "",
    author: item ? item.author : "",
    edition: item ? item.edition : "",
    country: item ? item.country : "",
    city: item ? item.city : "",
    year: item ? item.year : "",
    notes: item ? item.notes : "",
  });

  const { title, author, edition, city, year, notes } = formData;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError && message !== "") {
      toast(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast("Listing saved! You can now attach photos.");
      const section = document.querySelector("#photoSection");
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      dispatch(reset());
    }
    if (isPhotoUploaded) {
      toast(message);
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
        id: listing ? listing.id : null,
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
    dispatch(UploadPhoto(reqData));
  };

  const deletePhoto = () => {
    const reqData = {
      id: selectedID,
      token: user.Token,
    };
    // dispatch(DeletePhoto(reqData));
    setConfirmState(false);
    setID(null);
  };

  return (
    <>
      {user ? (
        <>
          <div className="content content-wrapper">
            <div className="h-items form-gap single">
              <div className="single r-gap-10">
                <section className="section-header t-margin-1">
                  <h3>{title ? title : "New Listing"}</h3>
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
                      value={title}
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
                      value={author}
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
                      value={edition}
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
                      defaultValue={genre}
                      onChange={onGenreChange}
                    />
                    <label>Country</label>
                    <Select
                      className="select"
                      id="country"
                      name="country"
                      placeholder={"where do you live?"}
                      options={countryOptions}
                      value={country}
                      onChange={onCountryChange}
                    />
                    <label>City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
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
                      value={year}
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
                      value={notes}
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
