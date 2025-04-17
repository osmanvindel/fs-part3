require("dotenv").config();

//Import mongoose
const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://vindelsoii:${password}@cluster0.b0cqor8.mongodb.net/backendApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  //node mongo.js password "value" "value"
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

//node mongo.js password
if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
