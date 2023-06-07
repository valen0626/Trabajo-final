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
  dinero: /^((\d+)|(\d{1,3}(\.\d{3})+)|(\d{1,3}(\.\d{3})(\,\d{3})+))(\,\d{2})?$/gm
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
  vistaConsultar.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaRetirar.style.display = 'none'
  vistaTransferir.style.display = 'none'
  const texto = document.querySelector("#verSaldo");
  const saludo = document.querySelector('#saludoSaldo')
  saludo.textContent = `Hola ${usuario.value}, su saldo disponible es`
  texto.textContent = `$${saldo}.00`
}
function consultarSaldo() {
  const texto = document.querySelector("#verSaldo");
  texto.textContent = `$${saldo}.00`
}

const seccionConsignar = () => {
  vistaConsignar.style.display = 'flex'
  vistaConsultar.style.display = 'none'
  vistaRetirar.style.display = 'none'
  vistaTransferir.style.display = 'none'

  inputs.forEach((input) => {
    input.addEventListener('keydown', validarFormulario)
    input.addEventListener('blur', validarFormulario)
  });
}

const consignar = () => {
  const valorAConsignar = document.querySelector("#valorAConsignar");
  const cuentaConsignar = document.querySelector("#cuentaConsignar");
  const pFechaConsignado = document.querySelector('#pFechaConsignado')
  const pValorConsignado = document.querySelector('#pValorConsignado')
  const pCuentaConsignado = document.querySelector('#pCuentaConsignado')
  const nuevaFecha = new Date();
  pCuentaConsignado.textContent = `${cuentaConsignar.value}`
  pValorConsignado.textContent = `$${valorAConsignar.value}`
  pFechaConsignado.textContent = `${nuevaFecha}`
  valorAConsignar.value =''
  cuentaConsignar.value =''
  saldo += parseInt(valorAConsignar.value);
};
 

const seccionRetirar = () => {
  vistaRetirar.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaConsultar.style.display = 'none'
  vistaTransferir.style.display = 'none'
  inputs.forEach((input) => {
    input.addEventListener('keydown', validarFormulario)
    input.addEventListener('blur', validarFormulario)
  });
}
const retirar = () => {
  const valorARetirar = document.querySelector("#valorARetirar");
  const pFechaRetirado = document.querySelector('#pFechaRetirado')
  const pValorRetirado = document.querySelector('#pValorRetirado')
  const nuevaFecha = new Date();
  if (parseInt(valorARetirar.value) <= saldo) {
    saldo -= parseInt(valorARetirar.value);
    pValorRetirado.textContent = `$${valorARetirar.value}`
    pFechaRetirado.textContent = `${nuevaFecha}`
    valorARetirar.value=''
  } else if (parseInt(valorARetirar.value) > saldo) {
    alert("¡Saldo insuficiente!");
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
    input.addEventListener('blur', validarFormulario)
  });
}
const transferir = () => {
  const valorTransferir = document.querySelector("#valorTransferir");
  const cuentaTransferir = document.querySelector("#cuentaTransferir")
  const pFechaTransferido = document.querySelector('#pFechaTransferido')
  const pValorTransferido = document.querySelector('#pValorTransferido')
  const pCuentaTransferido = document.querySelector('#pCuentaTransferido')
  const pBancoTransferido = document.querySelector('#pBancoTransferido')
  const nuevaFecha = new Date();
  const seleccionar = document.querySelector('#listaBancos')
  const opciones = seleccionar.options[seleccionar.selectedIndex];
  if (parseInt(valorTransferir.value) <= saldo) {
    saldo -= parseInt(valorTransferir.value);
    pValorTransferido.textContent = `$${valorTransferir.value}`
    pFechaTransferido.textContent=`${nuevaFecha}`
    pBancoTransferido.textContent =`${opciones.text}`
    pCuentaTransferido.textContent=`${cuentaTransferir.value}`
    valorTransferir.value=''
    cuentaTransferir.value=''
  } else if (parseInt(valorTransferir.value) > saldo) {
    alert("¡Saldo insuficiente!");
    valorTransferir.value = "";
  }
};
