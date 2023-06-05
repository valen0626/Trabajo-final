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
  dinero: /^$[0-9]{1,3}([\\.][0-9]{3})/
}

const salir = () => {
  location.href = "/index.html";
};

const verSaldo = () => {
  const saludo = document.querySelector('#saludoSaldo')
  vistaConsultar.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaRetirar.style.display ='none'
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
  vistaRetirar.style.display ='none'
  vistaTransferir.style.display = 'none'
  function validarFormulario(e) {
    switch (e.target.name) {
        case 'numeroCuenta':
            if (expresiones.numeros.test(e.target.value)) {
                numeroCuenta.classList.remove('incorrecto')
                numeroCuenta.classList.add('correcto')
            }else{
                numeroCuenta.classList.remove('correcto')
                numeroCuenta.classList.add('incorrecto')
            }
            break;
        case 'valorAConsignar':
            if (expresiones.dinero.test(e.target.value)) {
                valorAConsignar.classList.add('correcto')
                valorAConsignar.classList.remove('incorrecto')  
            }else{
                valorAConsignar.classList.remove('correcto')
                valorAConsignar.classList.add('incorrecto')
            }
            break;    
    }
}
  inputs.forEach((input) => {
    input.addEventListener('keydown', validarFormulario)
    input.addEventListener('blur',validarFormulario)
});
}
const consignar = () => {
  const valorAConsignar = document.querySelector("#valorAConsignar");
  const numeroCuenta = document.querySelector("#numeroCuenta");
  const consignarHecho = document.createElement("section");
  const nuevaFecha = new Date();
  consignarHecho.classList.add("comprobante");
  consignarHecho.innerHTML += ``
  // consignarHecho.innerHTML += `<h1>!Consignación éxitosa¡</h1>
  //   <p><h2>Numero de cuenta: </h2>${numeroCuenta.value}</p>
  //   <p><h2>Valor Consignado: </h2>${valorAConsignar.value}</p>
  //   <p><h2>Fecha: </h2>${nuevaFecha}</p>`;
  main.append(consignarHecho);
  saldo += parseInt(valorAConsignar.value);
};

const seccionRetirar = () => {
  vistaRetirar.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaConsultar.style.display ='none'
  vistaTransferir.style.display = 'none'
}
const retirar = () => {
  const valorARetirar = document.querySelector("#valorARetirar");
  const retirarHecho = document.createElement("section");
  const nuevaFecha = new Date();
  retirarHecho.classList.add("comprobante");
  if (parseInt(valorARetirar.value) <= saldo) {
    saldo -= parseInt(valorARetirar.value);
    retirarHecho.innerHTML += `<h1>!Retiro éxitoso¡</h1>
    <p><h2>Valor retirado: </h2>${valorARetirar.value}</p>
    <p><h2>Fecha: </h2>${nuevaFecha}</p>`;
    main.append(retirarHecho);
  } else if (parseInt(valorARetirar.value) > saldo) {
    alert("!Saldo insuficiente¡");
    valorARetirar.value = "";
  }
};

const seccionTransferir = () => {
  vistaTransferir.style.display = 'flex'
  vistaConsignar.style.display = 'none'
  vistaRetirar.style.display ='none'
  vistaConsultar.style.display = 'none'
}
const transferir = () => {
  const valorTransferir = document.querySelector("#valorTransferir");
  const numeroCuenta = document.querySelector("#cuentaTransferir")
  const transferirHecho = document.createElement("section");
  const nuevaFecha = new Date();
  const seleccionar = document.querySelector('#listaBancos')
  const opciones = seleccionar.options[seleccionar.selectedIndex];
  transferirHecho.classList.add("comprobante");
  if (parseInt(valorTransferir.value) <= saldo) {
    saldo -= parseInt(valorTransferir.value);
    transferirHecho.innerHTML += `<h1>!Transferencia éxitosa¡</h1>
      <h2>Numero de cuenta: </h2><p>${numeroCuenta.value}</p>
      <h2>Banco: </h2><p>${opciones.text}</p>
      <h2>Valor transferido: </h2><p>${valorTransferir.value}</p>
      <h2>Fecha: </h2><p>${nuevaFecha}</p>`;
    main.append(transferirHecho);
  } else if (parseInt(valorTransferir.value) > saldo) {
    alert("!Saldo insuficiente¡");
    valorTransferir.value = "";
  }
};
