import React from "react";

const Persons = ({ person, handleDelete, slide }) => {
  return (
    <li id={person.name[0]}>
      <i className="fas fa-user 3x"></i>
      {person.name}
      <div className="phone">
        {" "}
        <i className="fas fa-mobile"></i>
        {person.number}
      </div>

      <div className="delete">
        <i
          key={person.id}
          onClick={() => {
            return window.confirm(`Delete ${person.name}?`)
              ? handleDelete(person.id)
              : null;
          }}
          className="far fa-trash-alt 3x"
        >
          {" "}
        </i>
      </div>
    </li>
  );
};

export default Persons;
