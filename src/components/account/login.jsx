import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../features/auth/authSlice";
import { modalSlice } from "../../features/helpers/modalSlice";
import { FaTimes } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || (user !== null && user.Token !== null)) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  const { email, password } = formData;

  return (
    <div className="account-container">
      <div className="acc-overlay"></div>
      <div className="account-content">
        <section className="heading">
          <h1>Come aboard</h1>
          <FaTimes
            onClick={() => {
              dispatch(modalSlice.actions.updateLoginState());
            }}
          />
        </section>
        <section className="form">
          <form className="form-group" onSubmit={onSubmit}>
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email address"
              onChange={onChange}
            />
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onChange}
            />
            <div className="functions">
              <button type="submit">Sign in</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
