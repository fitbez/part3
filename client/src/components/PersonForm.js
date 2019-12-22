import React from "react";

const PersonForm = ({
  valueName,
  valueNumber,
  onChangeName,
  addPerson,
  onChangeNumber
}) => {
  return (
    <div>
      <form>
        <div className="input-form">
          <div className="name">
            <input
              className="input-name"
              placeholder="name"
              value={valueName}
              onChange={onChangeName}
            />
          </div>
          <div className="number">
            <input
              className="input-number"
              placeholder="phone"
              value={valueNumber}
              onChange={onChangeNumber}
            />
          </div>
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
