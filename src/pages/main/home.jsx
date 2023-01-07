import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetGenres } from "../../features/listing/listingSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { genres } = useSelector((state) => state.listing);

  useEffect(() => {
    if (!genres) {
      dispatch(GetGenres());
    }
  }, [user, genres, navigate, dispatch]);

  return <div className="content content-wrapper"></div>;
}

export default Home;
