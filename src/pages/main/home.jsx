import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Browser from "../../components/helpers/browser";
import { GetGenres } from "../../features/listing/listingSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { param } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { genres } = useSelector((state) => state.listing);

  useEffect(() => {
    if (!genres) {
      dispatch(GetGenres());
    }
  }, [user, genres, param, navigate, dispatch]);

  return (
    <div className="content content-wrapper">
      <Browser self={param == "self" ? true : false} />
    </div>
  );
}

export default Home;
