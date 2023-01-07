import Select from "react-select";

function GenreSelection() {
  return (
    <>
      <div className="select-container">
        <Select options={options} />
      </div>
    </>
  );
}

export default GenreSelection;
