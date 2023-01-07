import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/listing/listingSlice";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import Select from "react-select";

function ListingManager({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { genres, isSuccess, isError, message } = useSelector(
    (state) => state.listing
  );
  const [country, setCountry] = useState(item ? { label: item.country } : "");
  const [genre, setGenres] = useState(item ? { label: item.genres } : "");

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
      toast(message);
    }
  }, [user, navigate, dispatch]);

  const onCountryChange = (value) => {
    setCountry(value);
  };
  const onGenreChange = (value) => {
    setGenres(value);
  };
  const onSubmit = (value) => {
    e.preventDefault();
  };

  return (
    <>
      {user ? (
        <>
          <div className="content content-wrapper">
            <div className="h-items form-gap">
              <div className="multi r-gap-10">
                <section className="section-header t-margin-1">
                  <h3>New Listing</h3>
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
                    <button className="btn-function">Submit Listing</button>
                  </form>
                </section>
              </div>
              <div className="multi r-gap-10">
                <section className="section-header t-margin-1">
                  <h3>Photos</h3>
                </section>
                <section className="section-forms"></section>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ListingManager;
