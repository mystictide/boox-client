import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { modalSlice } from "../features/helpers/modalSlice";
import RegisterModal from "./account/register";
import LoginModal from "./account/login";
import UserDropdown from "./helpers/userDropdown";
import { BsChevronBarDown } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loginActive, registerActive } = useSelector((state) => state.modals);


  useEffect(() => {}, [user, loginActive, registerActive, navigate, dispatch]);

  const toggleDropdown = () => {
    const container = document.getElementById("user-dropdown");
    container.classList.add("active");
  };

  return (
    <>
      <header id="header">
        <nav>
          {user ? (
            <>
              <Link to="/" className="logo" />
              <div className="main-nav">
                <ul className="nav-list">
                  <li className="user" onMouseEnter={toggleDropdown}>
                    <img
                      src="https://a.ltrbxd.com/resized/avatar/upload/1/0/2/9/3/6/2/shard/avtr-0-48-0-48-crop.jpg?v=eef5721bdc"
                      alt="furkang"
                    />
                    <button type="button" className="drop-button">
                      {user.Username} <BsChevronBarDown className="drop-icon" />
                    </button>
                    <UserDropdown user={user} />
                  </li>
                  <li>Films</li>
                  <li>Messages</li>
                  <li>Lists</li>
                  <li>Members</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="logo" />
              <div className="main-nav ">
                <ul className="nav-list">
                  <li>
                    <button
                      type="button"
                      className="account-button"
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
                      className="account-button"
                      onClick={() => {
                        dispatch(modalSlice.actions.updateRegisterState());
                      }}
                    >
                      Register
                    </button>
                  </li>
                  <li>Films</li>
                  <li>Lists</li>
                  <li>Members</li>
                  <li>Blog</li>
                  <li>
                    <div className="search-box">
                      <fieldset>
                        <input className="search"></input>
                        <button type="button" className="alt-search-button">
                          <BiSearch />
                        </button>
                      </fieldset>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </header>
      {loginActive ? <LoginModal /> : ""}
      {registerActive ? <RegisterModal /> : ""}
    </>
  );
};

export default Header;
