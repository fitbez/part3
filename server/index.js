const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);
morgan.token("person", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(bodyParser.json());

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
    number: "39-23-6423123",
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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

// a random number b/n 1 and 100
const personId = Math.floor(Math.random() * 100) + 4;
const name = persons.map(person => person.name);

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: personId
  };

  if (name.includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }
  // person.id = personId;
  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
