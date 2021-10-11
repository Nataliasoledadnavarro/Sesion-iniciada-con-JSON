//// ELEMENTOS DEL DOM /////
const h1 = document.querySelector("h1");
const botonInicio = document.querySelector("#boton-inicio");
const inputUsuario = document.querySelector("#usuario");
const inputContrasenia = document.querySelector("#input-contrasenia");
const botonSubmit = document.querySelector("#boton-submit");
const formulario = document.querySelector("form");
const botonCambiarDatos = document.querySelector("#cambiar-datos");
const botonCerrarSesion = document.querySelector("#cerrar-sesion");
const formularioCambioDatos = document.querySelector(
    "#formulario-cambiar-datos"
  );
  const inputNuevoNombre = document.querySelector("#usuario-nuevo-dato");
  const inputNuevaContrasenia = document.querySelector(
    "#input-contrasenia-nueva"
  );
  const botonNuevaInformacion = document.querySelector(
    "#boton-nueva-informacion"
  );



/////FUNCIONES AUXILIARES //////

const saludar = (objeto) => {
  h1.textContent = `Hola ${objeto.nombre}!`;
};

const modificarNombreDeUsuario = (user, nuevoNombre) => {
  user.nombreUsuario = nuevoNombre;
  return user;
};


const modificarContrasenia = (user, nuevaContrasenia) => {
  user.contrasenia = nuevaContrasenia;
};

//Crea la función convertirAJSON. La función debe recibir un objeto usuario como parámetro y retornar el objeto convertido a JSON.

const convertirAJSON = (user) => {
  return JSON.stringify(user);
};

//Crea la función convertirDesdeJSON. La función debe recibir una cadena JSON objetoJSON y retornar la cadena convertida a un objeto de Javascript.

const convertirDesdeJSON = (objetoEnJSON) => {
  return JSON.parse(objetoEnJSON);
};

//Definí la función guardarEnLocalStorage que reciba como parámetro un objeto de Javascript y un string, y guarde en localStorage la cadena con el string como nombre de la clave (Recordá que antes de guardar un objeto en localStorage hay que convertirlo a JSON: usá la función convertirAJSON que declaraste antes)

//const JSONConvertidoAObjeto = convertirDesdeJSON(objetoConvertidoAJSON);

const guardarEnLocalStorage = (objeto, clave) => {
  const objetoJSON = convertirAJSON(objeto);

  localStorage.setItem(clave, objetoJSON);
};


//Definí la función leerDesdeLocalStorage que reciba como parámetro un string clave y retorne un objeto de Javascript con los datos guardados bajo esa clave en localStorage. (Utilizá la función convertirDesdeJSON!)

const leerDesdeLocalStorage = (clave) => {
  const datosLocalStorage = localStorage.getItem(clave);

  return convertirDesdeJSON(datosLocalStorage);
};


////////////////////////////// EJERCICIO INTEGRADOR //////////////////////////////////

//1. Guardar objeto en local Storage
const usuario = {
  nombre: "Natalia",
  contrasenia: "lala",
  sesionIniciada : false
}

botonInicio.onclick = () =>{
  formulario.classList.remove("ocultar")
}

//2. Crear la funcion que valide usuario y contrasenia. Guarde esa información en local storage. Modifique el HTML.

botonSubmit.onclick = () =>{
  if(inputUsuario.value === usuario.nombre && inputContrasenia.value === usuario.contrasenia){
    saludar(usuario)
    usuario.sesionIniciada = true
    guardarEnLocalStorage(usuario, "Usuario")
    formulario.classList.add("ocultar")
    botonInicio.classList.add("ocultar")
    botonCerrarSesion.classList.remove("ocultar")
    botonCambiarDatos.classList.remove("ocultar")
  }
  else{alert("Contraseña o usuario incorrecto. Probá de nuevo!")}
}

///// Función que cierre la sesion y envie esa informacion al local storage.///////

botonCerrarSesion.onclick = ()=>{
  usuario.sesionIniciada = false;
  guardarEnLocalStorage(usuario, "Usuario")
  h1.textContent = "Hola!";
  botonInicio.classList.remove("ocultar")
  botonCerrarSesion.classList.add("ocultar")
  botonCambiarDatos.classList.add("ocultar")
  formulario.classList.add("ocultar")
  formularioCambioDatos.classList.add("ocultar")
}

////////////// Función para mantener la sesion iniciada //////////////////

const usuarioSesion = leerDesdeLocalStorage("Usuario")

const mantenerSesionIniciada = (objeto) =>{
  if(objeto.sesionIniciada === true){
    saludar(usuario)
    formulario.classList.add("ocultar")
    botonInicio.classList.add("ocultar")
    botonCerrarSesion.classList.remove("ocultar")
    botonCambiarDatos.classList.remove("ocultar")
  }
  else if(objeto.sesionIniciada === false){
    h1.textContent = "Hola!";
    botonInicio.classList.remove("ocultar")
    botonCerrarSesion.classList.add("ocultar")
    botonCambiarDatos.classList.add("ocultar")
    formulario.classList.add("ocultar")
    formularioCambioDatos.classList.add("ocultar")
  }
 }

 mantenerSesionIniciada(usuarioSesion)

 /////////////// Función cambiar nombre de usuario y contraseña. Que lo guarde en local storage /////////

botonCambiarDatos.onclick = () =>{
  formularioCambioDatos.classList.remove("ocultar")
}

botonNuevaInformacion.onclick = () => {
  usuario.nombre = inputNuevoNombre.value;
  usuario.contrasenia = inputNuevaContrasenia.value;
  guardarEnLocalStorage(usuario, "Usuario");
  alert("Datos cambiados!")
};
