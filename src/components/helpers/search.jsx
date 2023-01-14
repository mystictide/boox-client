function Search({ setFilter, setKeyword, keyword }) {
  return (
    <div className="h-items c-gap-10 r-gap-10">
      <input
        type="text"
        id="keyword"
        name="keyword"
        value={keyword}
        placeholder={"a book title.."}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="btn-function" onClick={(e) => setFilter(e, 1)}>
        Search
      </button>
    </div>
  );
}

export default Search;
