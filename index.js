//Dependencies
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {
  Person,
  getAll,
  findById,
  deleteById,
  create,
  existsByName,
} = require("./models/person");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors()); //Permitir peticiones de otros dominios (CORS)
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
      "| Body:",
      JSON.stringify(req.body) || "{}",
    ].join(" ");
  })
);
app.use(express.static("dist"));

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

//All persons
app.get("/api/persons", (req, res) => {
  getAll().then((persons) => {
    res.json(persons);
  });
});

//Info page
app.get("/info", (req, res) => {
  res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `);
});

//Get 1 person
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "person not found" });
    }
  });
});

//Delete person
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  deleteById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "person not found" });
    }
  });
});

//Add person
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "empty fields are not allowed",
    });
  }

  //existsByName(body.name).then((person) => {
  //   if (person) {
  //     return res.status(400).json({
  //       error: "this name already exists, try another one",
  //     });
  //   }
  // });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  create(person).then((savedPerson) => {
    res.json(savedPerson);
  });
});

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
//app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

//'Morgan' middleware para logging

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
