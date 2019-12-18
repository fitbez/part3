import React from "react";

const Persons = ({ person, handleDelete, persons }) => {
  return (
    <li>
      <i className="fas fa-user 3x"></i>
      {person.name}
      <i className="fas fa-phone 2x"></i>
      {person.number}
      <i
        onClick={() => {
          return window.confirm(`Delete ${person.name}?`)
            ? handleDelete(person.id)
            : null;
        }}
        className="far fa-trash-alt 3x"
      >
        {" "}
      </i>
    </li>
  );
};

export default Persons;
