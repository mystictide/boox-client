import { useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteListing } from "../../features/listing/listingSlice";
import Confirmation from "../modals/confirmation";

function ListingBoxes({ data, self }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [selectedID, setID] = useState(null);
  const [confirmActive, setConfirmState] = useState(false);

  const onEdit = (e) => {
    navigate(`/listing/${e.ID}`, { state: { item: e } });
  };

  const getConfirm = (id) => {
    setID(id);
    setConfirmState(true);
  };

  const deleteListing = () => {
    const reqData = {
      id: selectedID,
      token: user.Token,
    };
    dispatch(DeleteListing(reqData));
    setConfirmState(false);
    setID(null);
  };

  return (
    <>
      <ul className="h-list c-gap-10 r-gap-10 t-margin-1 boxes uncentered">
        {data.map((item, index) => (
          <li
            className={`listing ${item.IsActive ? "" : "passive"}`}
            key={index}
          >
            <div className="info">
              <h4>{item.Title}</h4>
            </div>
            {self ? (
              <div className="functions c-gap-10">
                <button
                  className="btn-edit"
                  onClick={() => {
                    onEdit(item);
                  }}
                >
                  <BsFillGearFill />
                </button>
                <button
                  className="btn-function activity"
                  onClick={() => {
                    getConfirm(item.ID);
                  }}
                >
                  {item.IsActive ? "Hide" : "Publicize"}
                </button>
              </div>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
      {confirmActive ? (
        <Confirmation func={deleteListing} modalControl={setConfirmState} />
      ) : (
        ""
      )}
    </>
  );
}

export default ListingBoxes;
