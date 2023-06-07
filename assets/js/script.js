const usuario = document.querySelector("#usuario");
const password = document.querySelector("#contraseña");
const formulario = document.querySelector('form')
const inputs = document.querySelectorAll('form input')
const titulo = document.createElement('h1')
const textoIntentos = document.querySelector("#texto-intentos")
const main = document.querySelector("main");
const vistaConsultar = document.querySelector('#vistaConsultar')
const vistaConsignar = document.querySelector('#vistaConsignar')
const vistaTransferir = document.querySelector('#vistaTransferir')
const vistaRetirar = document.querySelector('#vistaRetirar')
let saldo = 1000000;

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
    if (contadorIntentos == 1) {
      textoIntentos.textContent = 'Le quedan 2 intentos'
    } else if (contadorIntentos == 2) {
      textoIntentos.textContent = 'Le queda 1 intento'
    }
  }

  if (contadorIntentos >= 3) {
    formulario.remove()
    titulo.textContent = "bloqueado"
    formulario.append(titulo)
  }
};

const expresiones = {
  numeros: /^-?\d+\.?\d*$/m,
  dinero: /(?:[$]+[ ]?(?:(?:[0-9]{1,3}[ \.,]?)*[ \.,]?[0-9]+)(?: million[s]?| billion[s]?| dollar[s]?)+)|(?:[$]+[ ]?(?:[0-9]{1,3}[ \.,]?)*[ \.,]?[0-9]+)|(?:(?:(?:[0-9]{1,3}[ \.,]?)*[ \.,]?[0-9]+)(?: million[s]?| billion[s]?| dollar[s]?)+)/g
}
function validarFormulario(e) {
  switch (e.target.name) {
    case 'cuentaConsignar':
      if (expresiones.numeros.test(e.target.value)) {
        cuentaConsignar.classList.remove('incorrecto')
        cuentaConsignar.classList.add('correcto')
      } else {
        cuentaConsignar.classList.remove('correcto')
        cuentaConsignar.classList.add('incorrecto')
      }
      break;
    case 'valorAConsignar':
      if (expresiones.dinero.test(e.target.value)) {
        valorAConsignar.classList.add('correcto')
        valorAConsignar.classList.remove('incorrecto')
      } else {
        valorAConsignar.classList.remove('correcto')
        valorAConsignar.classList.add('incorrecto')
      }
      break;
    case 'inputretirar':
      if (expresiones.dinero.test(e.target.value)) {
        valorARetirar.classList.add('correcto')
        valorARetirar.classList.remove('incorrecto')
      } else {
        valorARetirar.classList.remove('correcto')
        valorARetirar.classList.add('incorrecto')
      }
      break;
    case 'valorTransferir':
      if (expresiones.dinero.test(e.target.value)) {
        valorTransferir.classList.add('correcto')
        valorTransferir.classList.remove('incorrecto')
      } else {
        valorTransferir.classList.remove('correcto')
        valorTransferir.classList.add('incorrecto')
      }
      break;
      case 'cuentaTransferir':
        if (expresiones.numeros.test(e.target.value)) {
          cuentaTransferir.classList.add('correcto')
          cuentaTransferir.classList.remove('incorrecto')
        } else {
          cuentaTransferir.classList.remove('correcto')
          cuentaTransferir.classList.add('incorrecto')
        }
        break;  
  }
}
const salir = () => {
  location.href = "/index.html";
};

const verSaldo = () => {
  const saludo = document.querySelector('#saludoSaldo')
  vistaConsultar.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaRetirar.style.display = 'none'
  vistaTransferir.style.display = 'none'
  saludo.textContent = `Su saldo disponible es`
}
function consultarSaldo() {
  const texto = document.querySelector("p");
  texto.textContent = `$${saldo}.00`;
}

const seccionConsignar = () => {
  vistaConsignar.style.display = 'flex'
  vistaConsultar.style.display = 'none'
  vistaRetirar.style.display = 'none'
  vistaTransferir.style.display = 'none'

  inputs.forEach((input) => {
    input.addEventListener('keydown', validarFormulario)
  });
}
const consignar = () => {
  const valorAConsignar = document.querySelector("#valorAConsignar");
  const cuentaConsignar = document.querySelector("#cuentaConsignar");
  const consignarHecho = document.createElement("section");
  const nuevaFecha = new Date();
  consignarHecho.classList.add("comprobante");
  consignarHecho.innerHTML += `<h4>!Consignación éxitosa¡</h4>
    <p><h4>Numero de cuenta: </h4>${cuentaConsignar.value}</p>
    <p><h4>Valor Consignado: </h4>${valorAConsignar.value}</p>
    <p><h4>Fecha: </h4>${nuevaFecha}</p>`;
  main.append(consignarHecho);
  saldo += parseInt(valorAConsignar.value);
};

const seccionRetirar = () => {
  vistaRetirar.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaConsultar.style.display = 'none'
  vistaTransferir.style.display = 'none'
  inputs.forEach((input) => {
    input.addEventListener('keydown', validarFormulario)
  });
}
const retirar = () => {
  const valorARetirar = document.querySelector("#valorARetirar");
  const retirarHecho = document.createElement("section");
  const nuevaFecha = new Date();
  retirarHecho.classList.add("comprobante");
  if (parseInt(valorARetirar.value) <= saldo) {
    saldo -= parseInt(valorARetirar.value);
    retirarHecho.innerHTML += `<h4>!Retiro éxitoso¡</h4>
    <p><h4>Valor retirado: </h4>${valorARetirar.value}</p>
    <p><h4>Fecha: </h4>${nuevaFecha}</p>`;
    main.append(retirarHecho);
  } else if (parseInt(valorARetirar.value) > saldo) {
    alert("!Saldo insuficiente¡");
    valorARetirar.value = "";
  }
};

const seccionTransferir = () => {
  vistaTransferir.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaRetirar.style.display = 'none'
  vistaConsultar.style.display = 'none'
  inputs.forEach((input) => {
    input.addEventListener('keydown', validarFormulario)
  });
}
const transferir = () => {
  const valorTransferir = document.querySelector("#valorTransferir");
  const cuentaTransferir = document.querySelector("#cuentaTransferir")
  const transferirHecho = document.createElement("section");
  const nuevaFecha = new Date();
  const seleccionar = document.querySelector('#listaBancos')
  const opciones = seleccionar.options[seleccionar.selectedIndex];
  transferirHecho.classList.add("comprobante");
  if (parseInt(valorTransferir.value) <= saldo) {
    saldo -= parseInt(valorTransferir.value);
    transferirHecho.innerHTML += `<h3>!Transferencia éxitosa¡</h3>
      <h4>Numero de cuenta: </h5><p>${cuentaTransferir.value}</p>
      <h4>Banco: </h5><p>${opciones.text}</p>
      <h4>Valor transferido: </h4><p>${valorTransferir.value}</p>
      <h4>Fecha: </h4><p>${nuevaFecha}</p>`;
    main.append(transferirHecho);
  } else if (parseInt(valorTransferir.value) > saldo) {
    alert("!Saldo insuficiente¡");
    valorTransferir.value = "";
  }
};
