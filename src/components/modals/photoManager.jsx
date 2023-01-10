import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { blobToBase64 } from "../../assets/js/helpers";

function PhotoManager({ listing, modalControl, func }) {
  const [formData, setFormData] = useState({
    id: listing ? listing.id : null,
    data: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id, data } = formData;

  useEffect(() => {}, [user, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const reqData = {
      entity: {
        id,
        data,
      },
      token: user.Token,
    };
    func(reqData);
  };

  const onFileSelection = (e) => {
    if (e.target.files && e.target.files[0]) {
      blobToBase64(e.target.files[0]).then((res) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: res,
        }));
      });
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content address">
        <section className="heading">
          <h1>Upload photo</h1>
          <FaTimes
            onClick={() => {
              modalControl(false);
            }}
          />
        </section>
        <section>
          <form className="v-items r-gap-10" onSubmit={onSubmit}>
            <label>Select image file</label>
            <input
              type="file"
              id="data"
              name="data"
              onChange={(e) => {
                onFileSelection(e);
              }}
            />
            {data ? (
              <img className="img-preview" src={data} alt="selected image" />
            ) : (
              ""
            )}
            <div className="functions">
              <button type="submit" className="btn-function">
                Save image
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default PhotoManager;
