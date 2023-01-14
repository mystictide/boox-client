import Search from "./search";

function Pager({ data, setFilter, setKeyword, keyword }) {
  return (
    <div className="t-margin-1 h-items c-gap-10">
      <Search setFilter={setFilter} setKeyword={setKeyword} keyword={keyword} />
      {data.filter.pager.TotalPages > 1 ? (
        <div className="multi pager-container">
          <ul className="pager-data">
            {data.filter.pager.CurrentPage > 1 ? (
              <li className="pager-item">
                <button
                  className="pager-button"
                  onClick={(e) => setFilter(e, 1)}
                >
                  {"<<"}
                </button>{" "}
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage > 1 ? (
              <li className="pager-item">
                <button
                  className="pager-button"
                  onClick={(e) =>
                    setFilter(e, data.filter.pager.CurrentPage - 1)
                  }
                >
                  Previous
                </button>
              </li>
            ) : (
              ""
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li className="pager-item">
                <button
                  className="pager-button"
                  onClick={(e) =>
                    setFilter(e, data.filter.pager.CurrentPage + 1)
                  }
                >
                  Next
                </button>
              </li>
            )}
            {data.filter.pager.CurrentPage === data.filter.pager.TotalPages ? (
              ""
            ) : (
              <li className="pager-item">
                <button
                  className="pager-button"
                  onClick={(e) => setFilter(e, data.filter.pager.TotalPages)}
                >
                  {">>"}
                </button>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Pager;
