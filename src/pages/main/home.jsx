import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetLoginState } from "../../features/helpers/modalSlice";
import Dashboard from "./dashboard";

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

  if (user && user.Token !== null) {
    return <Dashboard />;
  }
  return <div className="content"></div>;
}

export default Home;
