import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillGearFill, BsXOctagonFill } from "react-icons/bs";
import {
  UpdateEmail,
  ChangePassword,
  ManageAddress,
  GetAddresses,
  resetSettings,
} from "../../features/auth/authSlice";
import { toast } from "react-toastify";

function UserSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isSettingsError, message } = useSelector((state) => state.auth);
  const error = useState(isSettingsError);
  const [email, setEmail] = useState(user.Email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (error && message !== "") {
      toast(message);
      dispatch(resetSettings());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    const reqData = {
      token: user.Token,
    };
    dispatch(GetAddresses(reqData));
  }, [dispatch]);

  const onEmailSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      email: email,
      token: user.Token,
    };
    dispatch(UpdateEmail(reqData));
  };

  const onPasswordSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      token: user.Token,
    };
    dispatch(ChangePassword(reqData));
  };

  return (
    <div className="content content-wrapper">
      <div className="h-items settings">
        <div className="multi r-gap-10">
          <section className="section-header t-margin-1">
            <h3>Account settings</h3>
          </section>
          <section className="section-forms">
            <form
              className="v-items r-gap-10 t-margin-1"
              onSubmit={onEmailSubmit}
            >
              <label>Email address</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn-function">Submit Email</button>
            </form>
            <form
              className="v-items r-gap-10 t-margin-1"
              onSubmit={onPasswordSubmit}
            >
              <label>Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                placeholder={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <label>New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                placeholder={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="btn-function">Submit Password</button>
            </form>
          </section>
        </div>
        <div className="multi r-gap-10">
          <section className="section-header t-margin-1">
            <h3>Addresses</h3>
          </section>
          <section className="section-forms">
            <ul className="h-list c-gap-10 r-gap-10 addresses">
              <li>
                <div className="address-info">
                  <h4>Address 1</h4>
                </div>
                <div className="functions c-gap-10">
                  <button className="btn-edit">
                    <BsFillGearFill />
                  </button>
                  <button className="btn-remove">
                    <BsXOctagonFill />
                  </button>
                </div>
              </li>
              <li>
                <div className="address-info">
                  <h4>Address 2</h4>
                </div>
                <div className="functions c-gap-10">
                  <button className="btn-edit">
                    <BsFillGearFill />
                  </button>
                  <button className="btn-remove">
                    <BsXOctagonFill />
                  </button>
                </div>
              </li>
              <li>
                <div className="address-info">
                  <h4>Address 3</h4>
                </div>
                <div className="functions c-gap-10">
                  <button className="btn-edit">
                    <BsFillGearFill />
                  </button>
                  <button className="btn-remove">
                    <BsXOctagonFill />
                  </button>
                </div>
              </li>
              <li>
                <div className="address-info">
                  <h4>Address 4</h4>
                </div>
                <div className="functions c-gap-10">
                  <button className="btn-edit">
                    <BsFillGearFill />
                  </button>
                  <button className="btn-remove">
                    <BsXOctagonFill />
                  </button>
                </div>
              </li>
              <li>
                <div className="address-info">
                  <h4>Address 5</h4>
                </div>
                <div className="functions c-gap-10">
                  <button className="btn-edit">
                    <BsFillGearFill />
                  </button>
                  <button className="btn-remove">
                    <BsXOctagonFill />
                  </button>
                </div>
              </li>
              <li>
                <div className="address-info">
                  <h4>Address 6</h4>
                </div>
                <div className="functions c-gap-10">
                  <button className="btn-edit">
                    <BsFillGearFill />
                  </button>
                  <button className="btn-remove">
                    <BsXOctagonFill />
                  </button>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
