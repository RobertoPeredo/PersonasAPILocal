const express = require('express'); // Utilizo el módulo de node de express
const path = require('path'); // Utilizo el módulo de node de path
const bodyParser = require('body-parser') // Utilizo el modulo de body parser
const app = express(); // Genero mi aplicación de express simplemente llamando al constructor express()
const endPoints = require('./API/routers/endPoints-router')

//Route
app.get('/', (req, res)=>{
    res.send("Bienvenido a mi API");
})

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


 //Middleware  (registra una ruta)
app.use('/personas', endPoints)


const port = process.env.port || 8080; // constante para nuestro puerto, es un OR para el caso de  desarrollo en algún servicio o desarrollo local 
app.listen(port, () =>console.log(`Escuchando en el puerto ${port}`))
