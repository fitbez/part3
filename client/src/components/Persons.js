import React from "react";

const Persons = ({ person, handleDelete, persons }) => {
  return (
    <li>
      {person.name} {""}
      {person.number}
      <button
        onClick={() => {
          return window.confirm(`Delete ${person.name}?`)
            ? handleDelete(person.id)
            : null;
        }}
      >
        delete
      </button>
    </li>
  );
};

export default Persons;
