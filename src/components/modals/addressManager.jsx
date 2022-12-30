import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ManageAddress } from "../../features/auth/authSlice";
import { modalSlice } from "../../features/helpers/modalSlice";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FaTimes } from "react-icons/fa";

function AddressManager({ userAddress }) {
  const [formData, setFormData] = useState({
    id: userAddress ? userAddress.ID : null,
    country: userAddress ? userAddress.Country : "",
    city: userAddress ? userAddress.City : "",
    phone: userAddress ? userAddress.Phone : "",
    address: userAddress ? userAddress.Address : "",
    postal: userAddress ? userAddress.Postal : "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [country, setCountry] = useState(userAddress ? userAddress : "");
  const options = useMemo(() => countryList().getData(), []);
  const [phone, setPhone] = useState(userAddress ? userAddress.Phone : "");
  const { city, address, postal } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user === null && user.Token === null) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
      address: { id, country, city, phone, address, postal },
      token: user.Token,
    };
    dispatch(ManageAddress(addressData));
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>New Address</h1>
          <FaTimes
            onClick={() => {
              dispatch(modalSlice.actions.updateAddressState());
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
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
