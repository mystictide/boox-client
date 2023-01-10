import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { modalSlice } from "../../features/helpers/modalSlice";

function Confirmation({ func, modalControl }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [navigate, dispatch]);

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content address">
        <section className="heading">
          <h1>Confirm</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <div className="v-items r-gap-10">
            <label>Are you sure you want to do this?</label>
            <button
              className="btn-edit btn-function"
              onClick={() => {
                func();
              }}
            >
              Yes
            </button>
            <button
              className="btn-remove btn-function"
              onClick={() => {
                modalControl(false);
              }}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Confirmation;
