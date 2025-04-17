require("dotenv").config();
//Import mongoose
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

//Le indicamos a mongoose ('toJSON') que cada vez que un objeto del modelo 'Person' en este caso
//se convierta en un JSON, hago uso de esta transformacion
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    //'document' es el documento original de la base de datos
    //'returnedObject' es una copia del documento que sera transformada
    //En este caso se crea un nuevo campo 'id' en la copia del documento
    //con el valor del campo '_id' original pero convertido a string (orignalmente es un ObjectId)
    //y luego se elimina el campo '_id' y el campo '__v'
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const getAll = () => {
  return Person.find({});
};

const findById = (id) => {
    return Person.findById(id);
}

const deleteById = (id) => {
    return Person.findByIdAndDelete(id);
}

const existsByName = (name) => {
    return Person.findOne({name: name});
}

const create = (person) => {
    return Person.create(person);
}

//Exportacion del modelo
module.exports = {Person, getAll, findById, deleteById, create, existsByName};
