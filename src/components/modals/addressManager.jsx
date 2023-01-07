import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ManageAddress, resetSettings } from "../../features/auth/authSlice";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FaTimes } from "react-icons/fa";

function AddressManager({ userAddress, modalControl }) {
  const [formData, setFormData] = useState({
    id: userAddress ? userAddress.id : null,
    title: userAddress ? userAddress.title : "",
    country: userAddress ? userAddress.country : "",
    city: userAddress ? userAddress.city : "",
    phone: userAddress ? userAddress.phone : "",
    address: userAddress ? userAddress.address : "",
    postal: userAddress ? userAddress.postal : "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSettingsSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [country, setCountry] = useState(
    userAddress ? { label: userAddress.country } : ""
  );
  const options = useMemo(() => countryList().getData(), []);
  const [phone, setPhone] = useState(userAddress ? userAddress.phone : "");
  const { id, city, title, address, postal } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user === null && user.Token === null) {
      navigate("/");
    }
    if (isSettingsSuccess) {
      dispatch(resetSettings());
      modalControl(false);
    }
  }, [user, isError, isSettingsSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onCountryChange = (value) => {
    setCountry(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const addressData = {
      entity: {
        id,
        title,
        country: country.label,
        city,
        phone,
        address,
        postal,
      },
      token: user.Token,
    };
    dispatch(ManageAddress(addressData));
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content address">
        <section className="heading">
          <h1>New Address</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <label>Address Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="enter a title"
              onChange={onChange}
            />
            <label>Country</label>
            <Select
              className="select"
              id="country"
              name="country"
              options={options}
              value={country}
              onChange={onCountryChange}
            />
            <label>City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              placeholder="enter city"
              onChange={onChange}
            />
            <label>Address Line</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder="enter your full address"
              onChange={onChange}
            />
            <label>Postal Code</label>
            <input
              type="text"
              id="postal"
              name="postal"
              value={postal}
              placeholder="enter postal code"
              onChange={onChange}
            />
            <label>Phone</label>
            <PhoneInput
              id="phone"
              name="phone"
              international
              defaultCountry="GB"
              value={phone}
              onChange={setPhone}
            />
            <div className="functions">
              <button type="submit" className="btn-function">
                Save Address
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddressManager;
