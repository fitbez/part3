/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import Error from "./components/Error";
import personService from "./services/persons";
import "./index.css";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notifiy, setNotifiy] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPerson => {
      console.log("promise fulfilled");
      setPersons(initialPerson);
    });
  }, []);

  const handleNameChange = e => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };
  const handleNumberChange = e => {
    // console.log(e.target.value);
    setNewNumber(e.target.value);
  };
  const handleFilterName = e => {
    // console.log(e.target.value);
    setFilterName(e.target.value);
  };

  const handleDelete = id => {
    axios
      .delete(`https://shielded-bastion-62666.herokuapp.com/api/persons/${id}`)
      .then(() => {
        setPersons(namesToShow.filter(person => person.id !== id));
      })
      .catch(error => {
        const deletedName = namesToShow.filter(person => person.id === id);
        console.log(deletedName);
        setErrorMessage(
          `Information has of ${deletedName[0].name} already been removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const filteredName = filterName.toUpperCase();
  const namesToShow = persons.filter(
    person => person.name.toUpperCase().indexOf(filteredName) > -1
  );

  const phoneBook = () =>
    namesToShow.map(person => {
      return (
        <Persons
          key={person.name}
          person={person}
          handleDelete={handleDelete}
          persons={persons}
        />
      );
    });

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    };

    personService
      .create(personObject)
      .then(returnedPerson => {
        setNotifiy(`${newName}`);
        setTimeout(() => {
          setNotifiy(null);
        }, 5000000);
      })
      .catch(error => {
        setErrorMessage(error.ValidatonError);
      });
    setPersons(persons.concat(personObject));
    setNewName(" ");
    setNewNumber(" ");
  };

  const updateNumber = id => {
    persons.some(e => {
      if (e.name.toUpperCase() === newName.toUpperCase()) {
        const id = e.id;
        const number = persons.find(n => n.id === e.id);
        const changedNumber = { ...number, number: newNumber };
        console.log(number);

        axios
          .put(
            `https://shielded-bastion-62666.herokuapp.com/api/persons/${id}`,
            changedNumber
          )
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id === id ? person : returnedPerson
              )
            );
          })
          .catch(error => {
            const deletedName = namesToShow.filter(person => person.id === id);
            console.log(deletedName);
            setErrorMessage(
              `Information has of ${deletedName[0].name} already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 500000);
          });
      }
    });
  };

  const handleCreateAndUpdate = () => {
    if (persons.some(e => e.name.toUpperCase() === newName.toUpperCase())) {
      window.confirm(
        `${newName} is already registerd want to update a number?`
      );
      // console.log("update number");
      return updateNumber();
    } else {
      return addPerson();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifiy} />
      <Error message={errorMessage} />
      <Filter value={filterName} onChange={handleFilterName} />
      <div>
        <h2>add a new</h2>
      </div>
      <PersonForm
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={handleNameChange}
        addPerson={handleCreateAndUpdate}
        onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <ul>{phoneBook()}</ul>
      </div>
    </div>
  );
};

export default App;
