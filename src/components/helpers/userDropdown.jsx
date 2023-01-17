import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";

function UserDropdown({ setUserDropdown }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
    navigate("/");
    dispatch(reset());
  };

  return (
    <>
      <div
        className="dropdown-container"
        onMouseLeave={(e) => setUserDropdown(false)}
        onClick={(e) => setUserDropdown(false)}
      >
        <div className="dropdown-content v-list">
          <ul>
            <li>
              <Link to={`/self`}>Listings</Link>
            </li>
            <li>
              <Link to={`/`}>Messages</Link>
            </li>
            <li>
              <Link to={`/`}>Favourites</Link>
            </li>
            <li className="divider">
              <Link to={`/settings`}>Settings</Link>
            </li>
            <li>
              <Link onClick={doLogout}>Sign out</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserDropdown;
