import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import {
  FilteredListing,
  FilteredSelfListing,
  reset,
} from "../../features/listing/listingSlice";
import Pager from "./pager";
import ListingBoxes from "../listing/listingboxes";

function Browser({ self }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { browser, isLoading, isSuccess } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    if (!browser && self) {
      const reqData = { keyword: keyword, page: 1, token: user.Token };
      dispatch(FilteredSelfListing(reqData));
    }
    if (!browser && !self) {
      const reqData = { keyword: keyword, page: 1 };
      dispatch(FilteredListing(reqData));
    }
    if (isSuccess) {
      dispatch(reset());
    }
  }, [browser, self, navigate, dispatch]);

  const setFilter = (e, page) => {
    if (!self) {
      const reqData = { keyword: keyword, page: page };
      dispatch(FilteredListing(reqData));
    }
    if (self) {
      const reqData = { keyword: keyword, page: page, token: user.Token };
      dispatch(FilteredSelfListing(reqData));
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <PropagateLoader color="#2b3a55" size={10} speedMultiplier={0.6} />
        </div>
      ) : (
        <div className="h-items single">
          {browser && browser.data ? (
            <>
              <span>
                {browser.filter.Keyword
                  ? browser.totalItems > 0
                    ? `Found ${browser.totalItems} offers for "${browser.filter.Keyword}"`
                    : `No matching results found for "${keyword}"`
                  : `Showing latest ${browser.totalItems} offer(s)`}
              </span>
              <Pager
                data={browser}
                setFilter={setFilter}
                setKeyword={setKeyword}
                keyword={keyword}
              />
              <ListingBoxes data={browser.data} self={self} />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default Browser;
