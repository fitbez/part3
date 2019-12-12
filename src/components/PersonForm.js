import React from "react";

const PersonForm = ({
  valueName,
  valueNumber,
  onChangeName,
  addPerson,
  onChangeNumber,
  persons,
  newName
}) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={valueName} onChange={onChangeName} />
        </div>

        <div>
          number: <input value={valueNumber} onChange={onChangeNumber} />
        </div>
        <div>
          <button className="addButton" type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
