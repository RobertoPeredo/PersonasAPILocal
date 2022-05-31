const { request } = require('express');
const res = require('express/lib/response');
const { links } = require('express/lib/response');

const endPoints = require('express').Router(); // importo el modulo de express específicamente coon el constructor que tiene express de .Router()

let personas = [
    {
        "id": 1,
        "Nombre": "Roberto",
        "Apellido": "Peredo",
        "Edad": 25,
        "Mail": "roberto@correo.com",
        "Celular": 2222222222
      },
      {
        "id": 2,
        "Nombre": "Maite",
        "Apellido": "Cruz",
        "Edad": 25,
        "Mail": "maite@correo.com",
        "Celular": 5555555555
      },
      {
        "id": 3,
        "Nombre": "Juan",
        "Apellido": "Perez",
        "Edad": 25,
        "Mail": "Juan@correo.com",
        "Celular": 6666666666
      }
];


//Obtener todos los datos de todas las personas de la lista
endPoints.get('/',(request, response)=>{
    response.json(personas)
    //*validar si está vacío
})

//Obtener los datos una persona de acuerdo a su Id

endPoints.get('/:id', (request,response)=>{
    const {id} = request.params //recupero el id de la persona haciendo un de-structur
    //response.json(personas.includes(2));
    if(personas.some( persona => persona.id === parseInt(id) )){   
       response.json(personas.find( persona => persona.id === parseInt(id) ));//encontramos el id que corresponda al  requerido
                                                                  } // Con parseInt convertimos a entero el string
    else{
        response.json("Este id no existe");
    }
})


// Agregar una nueva persona al arreglo
endPoints.post('/',(request, response)=>{

    //**validar si viene todos los datos */
    const nuevaPersona = {
        id: request.body.id,
        Nombre: request.body.Nombre,
        Apellido: request.body.Apellido,
        Edad: request.body.Edad,
        Mail: request.body.Mail,
        Celular: request.body.Celular
    }
    
    if(personas.some( persona => persona.id === parseInt(nuevaPersona.id) )){//Verifico si el id mandado desde el front ya existe dentro de mi arreglo de personas
        response.json("Esta id ya existe")
    }
    else{
        personas.push(nuevaPersona);
        response.json(nuevaPersona);       
    }
    

})

//Modificar los datos de una persona
endPoints.put('/:id', (request,response)=>{
    const {id} = request.params //recupero el id de la persona haciendo un de-structur

    if(personas.some( persona => persona.id === parseInt(id) )){ //encontramos el id que corresponda al  requerido
    
    //Obtengo los datos a remplazar
    const nuevaPersona = {
        id: request.body.id,
        Nombre: request.body.Nombre,
        Apellido: request.body.Apellido,
        Edad: request.body.Edad,
        Mail: request.body.Mail,
        Celular: request.body.Celular
    }    

    //Asigno a personaAModificar todo el objeto que hace match con el id
    personaAModificar= personas.find( persona => persona.id === parseInt(id))
    //Modifico la persona con los nuevos datos
    personaAModificar.id =nuevaPersona.id
    personaAModificar.Nombre =nuevaPersona.Nombre
    personaAModificar.Apellido =nuevaPersona.Apellido
    personaAModificar.Edad =nuevaPersona.Edad
    personaAModificar.Mail =nuevaPersona.Mail
    personaAModificar.Celular =nuevaPersona.Celular
    response.json(personaAModificar)
    
    
    } 
     else{
         response.json("Este id no existe");
     }
})


//Eliminar a una persona
endPoints.delete('/:id', (request,response)=>{
    const {id} = request.params //recupero el id de la persona haciendo un de-structur

    if(personas.some( persona => persona.id === parseInt(id) )){
      personas = personas.filter(persona => persona.id !== parseInt(id))      
      response.json(personas);

     }
     else {
        response.json("Este id no existe");
     }


})



// Exporto todos mis endPoints para que los "reconozca" en index.html
module.exports = endPoints;
