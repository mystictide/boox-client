import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import countryList from "react-select-country-list";

function Search({ setFilter, setKeyword, keyword }) {
  const { browser } = useSelector((state) => state.listing);
  const { genres } = useSelector((state) => state.listing);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const genreOptions = useMemo(() => genres, []);

  const [genre, setGenres] = useState(
    browser.filterModel.Genre ? browser.filterModel.Genre : ""
  );
  const [author, setAuthor] = useState(
    browser.filterModel.Author ? browser.filterModel.Author : ""
  );
  const [country, setCountry] = useState(
    browser.filterModel.Country ? { label: browser.filterModel.Country } : ""
  );
  const [filterModel, setFilterModel] = useState({
    author: author,
    genres: genre,
    country: country.label,
  });

  const onCountryChange = (value) => {
    setCountry(value);
    setFilterModel((prevState) => ({
      ...prevState,
      country: value.label,
    }));
  };
  const onGenreChange = (value) => {
    setGenres(value);
    setFilterModel((prevState) => ({
      ...prevState,
      genres: value,
    }));
  };
  const onAuthorChange = (value) => {
    setAuthor(value);
    setFilterModel((prevState) => ({
      ...prevState,
      author: value,
    }));
  };

  return (
    <div className="v-items c-gap-10 r-gap-10">
      <label>Genres</label>
      <Select
        isMulti
        className="select"
        id="genre"
        name="genre"
        placeholder={"select genres"}
        options={genreOptions}
        getOptionLabel={(options) => options["name"]}
        getOptionValue={(options) => options["ID"]}
        value={genre}
        onChange={onGenreChange}
      />
      <label>Country</label>
      <Select
        className="select"
        id="country"
        name="country"
        placeholder={"select country"}
        options={countryOptions}
        getOptionLabel={(options) => options["label"]}
        getOptionValue={(options) => options["value"]}
        value={country}
        onChange={onCountryChange}
      />
      <input
        type="text"
        id="author"
        name="author"
        value={author}
        placeholder={"search by author.."}
        onChange={(e) => onAuthorChange(e.target.value)}
      />
      <input
        type="text"
        id="keyword"
        name="keyword"
        value={keyword}
        placeholder={"search by title.."}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        className="btn-function"
        onClick={(e) => setFilter(e, 1, filterModel)}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
