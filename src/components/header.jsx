import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./account/login";
import RegisterModal from "./account/register";
import UserDropdown from "./helpers/userDropdown";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [userDropdown, setUserDropdown] = useState(false);
  const [loginActive, setLoginState] = useState(false);
  const [registerActive, setRegisterState] = useState(false);
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <header id="header">
        <nav className="content-wrapper">
          <Link to="/" className="logo">
            Boox!
          </Link>
          <ul className="h-list c-gap-10">
            <li className="search-box hide">
              <input
                className="search"
                type="text"
                id="keyword"
                name="keyword"
                value={keyword}
                placeholder="look up a book.."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="button" onClick={() => navigate(`/${keyword}`)}>
                <BiSearch />
              </button>
            </li>
            {user ? (
              <>
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
                <li>
                  <button
                    type="button"
                    className="btn-function"
                    onClick={() => {
                      navigate("/listing/new");
                    }}
                  >
                    Create Listing
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    type="button"
                    className="btn-regular"
                    onClick={() => {
                      setLoginState(true);
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
                      setRegisterState(true);
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
      {loginActive ? <LoginModal modalControl={setLoginState} /> : ""}
      {registerActive ? <RegisterModal modalControl={setRegisterState} /> : ""}
    </>
  );
};

export default Header;
