import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confirmation from "../modals/confirmation";
import { BsFillGearFill, BsXOctagonFill } from "react-icons/bs";

function ListingBoxes({ data, self }) {
  const navigate = useNavigate();
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
    // dispatch(DeleteList(reqData));
    setConfirmState(false);
    setID(null);
  };

  return (
    <>
      <ul className="h-list c-gap-10 r-gap-10 t-margin-1 boxes uncentered">
        {data.map((item, index) => (
          <li className="listing" key={index}>
            <div className="address-info">
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
                  className="btn-remove"
                  onClick={() => {
                    getConfirm(item.ID);
                  }}
                >
                  <BsXOctagonFill />
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
