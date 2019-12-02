const express = require("express");

const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 3
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 4
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 5
  }
];

const numberOfPeople = persons.length;
const now = new Date();

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<P>Phonebook has info for ${numberOfPeople} people</P>
      <P>${now}</P>
  `
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
