const usuario = document.querySelector("#usuario");
const password = document.querySelector("#contraseña");
const formulario = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const titulo = document.createElement('h1')
const textoIntentos = document.querySelector("#texto-intentos")
function bloquear() {
  
}

function Usuario(nombre, contraseña) {
  this.nombre = nombre;
  this.contraseña = contraseña;
}
const usuarioUno = new Usuario("jose", 123);
const usuarioDos = new Usuario("valentina", 1234);
const usuarioTres = new Usuario("juan", 12345);
let contadorIntentos = 0;
const validarUsuario = () => {
  if (
    usuario.value == usuarioUno.nombre &&
    password.value == usuarioUno.contraseña
  ) {
    location.href = "/paginaPrincipal.html";
  } else if (
    usuario.value == usuarioDos.nombre &&
    password.value == usuarioDos.contraseña
  ) {
    location.href = "/paginaPrincipal.html";
  } else if (
    usuario.value == usuarioTres.nombre &&
    password.value == usuarioTres.contraseña
  ) {
    location.href = "/paginaPrincipal.html";
  } else {
    contadorIntentos++;
    usuario.value = "";
    password.value = "";
    if (contadorIntentos==1) {
      textoIntentos.textContent = 'Le quedan 2 intentos'
    }else if (contadorIntentos==2) {
      textoIntentos.textContent = 'Le queda 1 intento'
    }
  }

  if (contadorIntentos >= 3) {
    formulario.remove()
    titulo.textContent = "bloqueado"
    formulario.append(titulo)
  }
};
