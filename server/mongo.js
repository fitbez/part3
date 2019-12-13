const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-m0sb0.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Perosn", personSchema);

const person = new Person({
  name: "Ada Lovelace",
  number: "040-123456"
});

person.save().then(response => {
  console.log("person saved");
  mongoose.connection.close();
});

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person);
  });
  mongoose.connection.close();
});
