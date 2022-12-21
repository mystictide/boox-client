import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { modalSlice } from "../features/helpers/modalSlice";
import RegisterModal from "./account/register";
import LoginModal from "./account/login";
import { BiSearch } from "react-icons/bi";
import UserDropdown from "./helpers/userDropdown";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loginActive, registerActive } = useSelector((state) => state.modals);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {}, [user, loginActive, registerActive, navigate, dispatch]);

  return (
    <>
      <header id="header">
        <nav className="content-wrapper">
          <Link to="/" className="logo">
            Boox!
          </Link>
          <ul className="h-list c-gap-10">
            <li className="search-box hide">
              <input className="search" placeholder="look up a book.." />
              <button type="button">
                <BiSearch />
              </button>
            </li>
            {user ? (
              <li style={{ position: "relative" }}>
                <button
                  type="button"
                  className="btn-regular"
                  onMouseEnter={(e) => setUserDropdown(true)}
                  onClick={(e) => setUserDropdown(true)}
                >
                  {user.Username}
                </button>
                {userDropdown ? (
                  <UserDropdown setUserDropdown={setUserDropdown} />
                ) : (
                  ""
                )}
              </li>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    className="btn-regular"
                    onClick={() => {
                      dispatch(modalSlice.actions.updateLoginState());
                    }}
                  >
                    Sign in
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn-regular"
                    onClick={() => {
                      dispatch(modalSlice.actions.updateRegisterState());
                    }}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="seperator" />
        <nav className="categories">
          <div className="content-wrapper">
            <ul className="h-list c-gap-10">
              <li>
                <Link to={""}>Action & Adventure</Link>
              </li>
              <li>
                <Link to={""}>Classics</Link>
              </li>
              <li>
                <Link to={""}>Comics</Link>
              </li>
              <li>
                <Link to={""}>Mystery</Link>
              </li>
              <li>
                <Link to={""}>Fantasy</Link>
              </li>
              <li>
                <Link to={""}>History</Link>
              </li>
              <li>
                <Link to={""}>Horror</Link>
              </li>
              <li>
                <Link to={""}>Poetry</Link>
              </li>
              <li>
                <Link to={""}>Romance</Link>
              </li>
              <li>
                <Link to={""}>Sci-Fi</Link>
              </li>
              <li>
                <Link to={""} style={{ padding: 0 }}>
                  Short Stories
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {loginActive ? <LoginModal /> : ""}
      {registerActive ? <RegisterModal /> : ""}
    </>
  );
};

export default Header;
