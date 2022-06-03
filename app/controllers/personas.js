const { response } = require('express');
const { request } = require('express');

/* personas es el objeto en donde tenemos nuestra "base de datos local"
Todos los cambios de post,put,delete, solo funcionan mientras el servidor esta funcionando,
en caso de reiniciar el servidor regresara a los valores actuales*/

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

//Obtener todas las personas de la lista

const obtenerPersonas = [(request, response)=>{

    //Validamos si el array está vacío
    if(personas.length===0){
        //En caso de estar vacío, mandamos el sig mensaje
        response.status(415).json({error: "No existe  ninguna persona registrada"});
     }
    else {
        //Sino está vació desplegamos la lista de todas las personas
    response.json(personas)}

}]



//Obtener una  personas de la lista de acuerdo a su ID
const obtenerPersona =[(request,response)=>{
    /*recupero el id de la persona haciendo un de-structur. La idea es crear una variable llamada id, 
    que está contenida con el mismo nombre id dentro de parms*/
    const {id} = request.params 
    
    //Hago la validación para ver si algún objeto de mi arreglo personas tiene el id igual al requerido(devuelve un bool)
    if(personas.some( persona => persona.id === parseInt(id) )){  

        /*Si existe ese id en mi array, entonces: 
        Encuentro el id que corresponda al  requerido y lo devuelvo en la response de mi api
        Como mi variable id viene en string con parseInt convertimos a entero id, porque el id 
        dentro del array personas es int*/        
       response.json(personas.find( persona => persona.id === parseInt(id) ));                                                                  } 
    else{
        //Sino existe imprimimos el mensaje
        response.status(410).json({error: "Este id no existe"});
    }
}]



//Añadir una nueva persona a la lista
const añadirPersona = [(request,response)=>{ 
/*Todo esto se ejecuta solo si los datos fueron validados. Es decir, validarDatos dentro de
/validator/personas.js continuó con  next()*/


    //Crea una variable tipo objeto, llamada nuevaPersona con los datos mandados en el body
    const nuevaPersona = {
        id: request.body.id,
        Nombre: request.body.Nombre,
        Apellido: request.body.Apellido,
        Edad: request.body.Edad,
        Mail: request.body.Mail,
        Celular: request.body.Celular
    }
    //Verifico si el id mandado desde la url ya existe dentro de mi arreglo de personas
    if(personas.some( persona => persona.id === parseInt(nuevaPersona.id) )){
        //Si existe, mando el mensaje
        response.status(411).json({error: "Este id ya existe"});
    }
    else{
        //Sino existe,lo agrego con push al arreglo de personas y mando en la respuesta el obj añadido
        personas.push(nuevaPersona);
        response.json(nuevaPersona);       
    }

}]

  
//Actualizar una nueva persona de la lista
const actualizarPersona = [  

    /*Todo esto se ejecuta solo si los datos fueron validados. Es decir, validarDatos dentro de
/validator/personas.js continuó con  next() */

    (request,response)=>{

    //Si no encontró ningún error en la validación entonces:
    /*recupero el id de la persona haciendo un de-structur. La idea es crear una variable llamada id, 
    que está contenida con el mismo nombre id dentro de parms*/
    const {id} = request.params

    //Verifico si el id mandado existe dentro de mi arreglo alguna persona dentro de mi array de personas
    if(personas.some( persona => persona.id === parseInt(id) )){ 
    
    /* Si la persona sí existe, entonces almaceno en una variable llamada nuevaPersona, de tipo object,
    todos los valores que provienen del body  */
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
   // Modifico la persona con los nuevos datos
    personaAModificar.id =nuevaPersona.id
    personaAModificar.Nombre =nuevaPersona.Nombre
    personaAModificar.Apellido =nuevaPersona.Apellido
    personaAModificar.Edad =nuevaPersona.Edad
    personaAModificar.Mail =nuevaPersona.Mail
    personaAModificar.Celular =nuevaPersona.Celular
    
    //Mando en la respuesta la persona con los datos modificados
    response.json(personaAModificar)
} 
     else{
         //Si el id no existe, mando el mensaje
         response.status(410).json({error: "Este id no existe"});
     }
    
}]

const eliminarPersona = [(request,response)=>{
    /*recupero el id de la persona haciendo un de-structur. La idea es crear una variable llamada id, 
    que está contenida con el mismo nombre id dentro de parms*/
    const {id} = request.params 

    //Verifico si el id mandado existe dentro de mi arreglo alguna persona dentro de mi array de personas
    if(personas.some( persona => persona.id === parseInt(id) )){
//Si existe, entonces 'filtro' mi array personas y solo dejo las personas que tengan un id diferente al introducido
      personas = personas.filter(persona => persona.id !== parseInt(id))      

      //Mando en mi respuesta el id de la persona eliminada
      response.json(id);
 }
     else {
         //Sino el id no existe, mando el mensaje
         response.status(410).json({error: "Este id no existe"});;
     }

    
}]

//exporto las funciones hacia mi ruta /routers/personas.js
module.exports = {obtenerPersonas, obtenerPersona,añadirPersona, actualizarPersona, eliminarPersona}



/* EJEMPLOS DE CÓMO FUNCIONAN LAS FUNCIONES FILTER, SOME Y FIND
1. FUNCIÓN FIND, sirve para: Encontrar un objeto en un array por una de sus propiedades

Ejemplo:

const inventario = [
    {nombre: 'manzanas', cantidad: 2},
    {nombre: 'bananas', cantidad: 0},
    {nombre: 'cerezas', cantidad: 5}
    ]; 

    resultado = inventario.find( fruta => fruta.nombre === 'cerezas' );

    console.log(resultado); // { nombre: 'cerezas', cantidad: 5 }

    Como se puede observar, en la variable resultado me devuelve todo el arreglo que contenga como 
    nombre "cerezas"


2. FUNCIÓN SOME, sirve para: comprueba si al menos un elemento del array cumple con la condición
 implementada por la función proporcionada. 


Ejemplo: 
const inventario = [
    {nombre: 'manzanas', cantidad: 2},
    {nombre: 'bananas', cantidad: 0},
    {nombre: 'cerezas', cantidad: 5}
    ]; 

resultado = inventario.some( fruta => fruta.nombre === 'cerezas' );

    console.log(resultado); // true

    Muy parecida a la función anterior, pero a diferencia del anterior ésta me devuelve un bool

    3. FUNCIÓN FILTER, sirva para: La función filter permite filtrar los elementos de un array y generar uno nuevo con todos
     los elementos que cumplen una determinada condición

     Ejemplo:
        let numArray = [1,2,3,4,5,6,7,8,9,10] 
        let filterNumArray = numArray.filter(element => element !== 5)

        console.log("numArray => ", numArray) //numArray =>  [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
        console.log("filterNumArray => ", filterNumArray) //filterNumArray =>  [1, 2, 3, 4, 6, 7, 8, 9, 10]

       
        Noten que la función tiene un !=== para filtrar los que sean  diferentes a 5
        si pongo === simplemente me devolvería un 5 en el array
       
        
*/