import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetLoginState } from "../../features/helpers/modalSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loginActive } = useSelector((state) => state.modals);

  useEffect(() => {
    if (user) {
      dispatch(resetLoginState());
    }
  }, [user, loginActive, navigate, dispatch]);

  return <div className="content content-wrapper"></div>;
}

export default Home;
