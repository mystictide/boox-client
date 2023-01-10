import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillGearFill, BsXOctagonFill } from "react-icons/bs";
import { modalSlice } from "../../features/helpers/modalSlice";
import AddressManager from "../../components/modals/addressManager";
import {
  DeleteAddress,
  UpdateEmail,
  ChangePassword,
  resetSettings,
  logout,
} from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Confirmation from "../../components/modals/confirmation";

function UserSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    isSettingsSuccess,
    isPasswordChanged,
    isSettingsError,
    message,
  } = useSelector((state) => state.auth);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user ? user.Email : "");
  const error = useState(isSettingsError);
  const [address, setAddress] = useState(null);
  const [confirmActive, setConfirmState] = useState(false);
  const [addressActive, setAddressState] = useState(false);
  const [selectedID, setID] = useState(null);

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
    if (isSettingsSuccess) {
      toast("settings saved successfully!");
      dispatch(resetSettings());
    }
    if (isPasswordChanged) {
      toast("password changed, please login again.");
      dispatch(resetSettings());
      dispatch(logout());
    }
  }, [error, message, dispatch]);

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

  const onAddressEdit = (e) => {
    setAddress(e);
    setAddressState(true);
  };

  const addNewAddress = (e) => {
    setAddress(null);
    setAddressState(true);
  };

  const getConfirm = (id) => {
    setID(id);
    setConfirmState(true);
  };

  const deleteAddress = () => {
    const reqData = {
      id: selectedID,
      token: user.Token,
    };
    dispatch(DeleteAddress(reqData));
    setConfirmState(false);
    setID(null);
  };

  return (
    <>
      {user ? (
        <>
          <div className="content content-wrapper">
            <div className="h-items form-gap">
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
                  <ul className="h-list c-gap-10 r-gap-10 boxes">
                    {user.Addresses
                      ? user.Addresses.map((address, index) => (
                          <li className="address" key={index}>
                            <div className="address-info">
                              <h4>{address.title}</h4>
                              <h6>
                                {address.city}, {address.country}
                              </h6>
                            </div>
                            <div className="functions c-gap-10">
                              <button
                                className="btn-edit"
                                onClick={() => {
                                  onAddressEdit(address);
                                }}
                              >
                                <BsFillGearFill />
                              </button>
                              <button
                                className="btn-remove"
                                onClick={() => {
                                  getConfirm(address.id);
                                }}
                              >
                                <BsXOctagonFill />
                              </button>
                            </div>
                          </li>
                        ))
                      : ""}

                    <li>
                      <div>
                        <button
                          className="btn-function"
                          onClick={() => {
                            addNewAddress(true);
                          }}
                        >
                          Add a new address
                        </button>
                      </div>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
          {addressActive ? (
            <AddressManager
              userAddress={address}
              modalControl={setAddressState}
            />
          ) : (
            ""
          )}
          {confirmActive ? (
            <Confirmation func={deleteAddress} modalControl={setConfirmState} />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default UserSettings;
