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

  /*Deleting a person by its ID */
  const handleDelete = id => {
    axios
      .delete(`https://phonebook-2019.herokuapp.com/api/persons/${id}`)
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

  /* Sort an array of contact list alphabetically */
  const dynamicSort = name => {
    let sortOrder = 1;
    if (name[0] === "-") {
      sortOrder = -1;
      name = name.substr(1);
    }
    return (a, b) => {
      if (sortOrder === -1) {
        return b[name].localeCompare(a[name]);
      } else {
        return a[name].localeCompare(b[name]);
      }
    };
  };
  namesToShow.sort(dynamicSort("name"));

  /* renders contact lists by maping out array of persons object */
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

  /*Building letter array from A to Z*/
  let createArrayAtoZ = () => {
    return Array.apply(null, { length: 26 }).map((x, i) =>
      String.fromCharCode(65 + i)
    );
  };
  let chars = createArrayAtoZ();

  /* Scrolls to a matched letter */
  const handleJump = (i, e) => {
    const names = namesToShow.map(person => {
      return person.name;
    });
    names.forEach(name => {
      if (i === name[0].toUpperCase()) {
        window.location.href = `#${name[0]}`;
      }
    });
  };

  /* Makes nav active if it has a much from contact list */
  // console.log(chars);

  let getFirstLetterOfNames = namesToShow.map(person => {
    return person.name[0].toUpperCase();
  });

  const activeLetters = chars.filter(
    val => -1 !== getFirstLetterOfNames.indexOf(val)
  );

  const cName = document.querySelectorAll(".contactElement.inactive");

  /*Creating a person object */
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
        }, 5000000000);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
    setPersons(persons.concat(personObject));
    setNewName(" ");
    setNewNumber(" ");
  };

  /*Updating a person object */
  const updateNumber = id => {
    persons.some(e => {
      if (e.name.toUpperCase() === newName.toUpperCase()) {
        const id = e.id;
        const number = persons.find(n => n.id === e.id);
        const changedNumber = { ...number, number: newNumber };
        console.log(number);

        axios
          .put(
            `https://phonebook-2019.herokuapp.com/api/persons/${id}`,
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
            }, 5000000000);
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
      <div className="container">
        <div className="add-contact">
          <div className="phonebook">
            <div>
              <i className="far fa-address-book"></i>
            </div>
            <div>
              <h2>Phonebook</h2>
            </div>
          </div>
          <Notification message={notifiy} />
          <Error message={errorMessage} />
          <Filter value={filterName} onChange={handleFilterName} />
          <div>
            <h3> New Contact</h3>
          </div>
          <PersonForm
            valueName={newName}
            valueNumber={newNumber}
            onChangeName={handleNameChange}
            addPerson={handleCreateAndUpdate}
            onChangeNumber={handleNumberChange}
          />
        </div>
        <div className="contact-list">
          <div className="contact-head">
            <h3>Contacts</h3>
            <p>{`${namesToShow.length} contacts`}</p>
          </div>
          <div id="nav" className="char-container">
            {chars.map((char, index) => {
              return (
                <div
                  className="contactElement inactive"
                  data-filter={`${char}`}
                  key={index}
                  onLoad={() => {}}
                  onClick={handleJump.bind(this, char)}
                >
                  {char}
                </div>
              );
            })}
          </div>
          <div>
            {" "}
            <ul>{phoneBook()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
