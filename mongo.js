require('dotenv').config()

//Import mongoose
const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

//const password = process.argv[2]
const password = process.env.MONGODB_PASSWORD
//const password = encodeURIComponent(process.env.PASSWORD)

const url = `mongodb+srv://vindelsoii:${password}@cluster0.b0cqor8.mongodb.net/backendApp?retryWrites=true&w=majority&appName=Cluster0`

//Define como se comportan las consultas que tienen filtros con claves (campos) no defindos
mongoose.set('strictQuery',false)

mongoose.connect(url)

//Creacion de esquema (equivalente a una tabla)
//Se tiene que definir un esquema antes de interactuar con dicha coleccion
//para que mongoose conozca a partir de su estructura, como interactuar con el documento.
//Este esquema se se creara en caso de no existir tras la primera consulta sobre este.
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//Asociamos el esquema con el modelo (Person) el cual nos permitira crear objetos para interactuar 
//con la coleccion
//Mongoose internamente creara una coleccion sino existe tomando en cuenta el nombre de nuestro modelo
//'Person' en este caso, y lo pluralizara (mediante la libreria 'pluralize') y lo almacenara como 'people' 
//en este caso. Cuando interactuemos con nuestra coleccion, mongoose buscara la version en plural, minuscual del
//nombre de nuestro modelo ('Person' en este caso.
//Un modelo es una 'clase' con la cual podemos construir documentos
const Person = mongoose.model('Person', personSchema)

//*Tanto la definicion del esquema como la del modelo son necesarias antes de trabajar con la coleccion,
//sin importar que esta ya exista

//Objeto del tipo 'Person' el cual corresponde al modelo
const person = new Person({
  name: 'Michael Jackson',
  number: '12345678',
})

//Guarda el objeto en la coleccion
// person.save().then(result => {
//   console.log('person saved!')
//   console.log(result);
//   mongoose.connection.close()
// })


//Busca todos los documentos en la coleccion
// '{}' indica que no hay filtros para la busqueda (debido a que esta vacio) por ende trae todos
//'find()' es el equivalente a 'select'
//Person.find({}).then(result => { 
Person.find({ name: 'Osman Vindel'}).then(result => { //Aplicando filtro  
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})
