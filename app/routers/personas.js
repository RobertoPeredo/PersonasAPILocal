/*HOJA DE RUTAS, en esta hoja vamos a tener el control de todas las rutas de nuestra app*/
const { request } = require('express');
const res = require('express/lib/response');
const { links, json } = require('express/lib/response');
// importo el modulo de express específicamente coon el constructor que tiene express de .Router()
const endPoints = require('express').Router(); 
//importo las funciones desde la ruta /controllers/personas.js
const {obtenerPersonas, obtenerPersona,añadirPersona,actualizarPersona,eliminarPersona }= require('../controllers/personas')


/* ENDPOINTS */
/*Todas las funciones como por ejemplo obterPersonas, realizan toda su funcionalidad
en la hoja ../controllers/personas') se hace de esta forma para tener mas control en nuestro código */


//Obtener todos los datos de todas las personas de la lista
endPoints.get('/',obtenerPersonas)

//Obtener los datos una persona de acuerdo a su Id
endPoints.get('/:id', obtenerPersona)

// Agregar una nueva persona al arreglo
endPoints.post('/', añadirPersona)

//Modificar los datos de una persona
endPoints.put('/:id', actualizarPersona)

//Eliminar a una persona
endPoints.delete('/:id', eliminarPersona )

// Exporto todos mis endPoints para que los "reconozca" en index.html
module.exports = endPoints;
