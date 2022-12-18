import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronBarDown } from "react-icons/bs";
import { logout, reset } from "../../features/auth/authSlice";

function UserDropdown({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
    navigate("/");
    dispatch(reset());
  };

  const toggleDropdown = () => {
    const container = document.getElementById("user-dropdown");
    container.classList.toggle("active");
  };

  return (
    <>
      <div
        className="dropdown-container"
        id="user-dropdown"
        onMouseLeave={toggleDropdown}
      >
        <div className="dropdown-content">
          <section className="heading">
            <img
              src="https://a.ltrbxd.com/resized/avatar/upload/1/0/2/9/3/6/2/shard/avtr-0-48-0-48-crop.jpg?v=eef5721bdc"
              alt="furkang"
            />
            <button type="button">
              {user.Username} <BsChevronBarDown className="drop-icon" />
            </button>
          </section>
          <section className="dropdown">
            <ul className="drop-list">
              <li className="drop-item">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="drop-item">
                <Link to={`/u/${user.Username}`}>Profile</Link>
              </li>
              <li className="drop-item">
                <Link>Films</Link>
              </li>
              <li className="drop-item">
                <Link>Reviews</Link>
              </li>
              <li className="drop-item">
                <Link>Watchlist</Link>
              </li>
              <li className="drop-item">
                <Link>Lists</Link>
              </li>
              <li className="drop-item">
                <Link>Likes</Link>
              </li>
              <li className="drop-item">
                <Link>Network</Link>
              </li>
              <li className="drop-item divider">
                <Link to={`/settings`}>Settings</Link>
              </li>
              <li className="drop-item">
                <Link onClick={doLogout}>Log out</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default UserDropdown;
