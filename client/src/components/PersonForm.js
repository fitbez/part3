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
          <input
            className="input-name"
            placeholder="name"
            value={valueName}
            onChange={onChangeName}
          />

          <input
            className="input-number"
            placeholder="phone number"
            value={valueNumber}
            onChange={onChangeNumber}
          />
        </div>
        <div className="btn-btn">
          <button className="btn" type="submit" onClick={addPerson}>
            <p>add new contact</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
