import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <input className="input-search" value={value} onChange={onChange} />{" "}
      Search
    </div>
  );
};

export default Filter;
