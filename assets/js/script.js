const usuario = document.querySelector("#usuario");
const password = document.querySelector("#contraseña");
const formulario = document.querySelector("form");
const inputs = document.querySelectorAll("form input");
const titulo = document.createElement("h1");
const textoIntentos = document.querySelector("#texto-intentos");
const main = document.querySelector("main");
const vistaConsultar = document.querySelector("#vistaConsultar");
const vistaConsignar = document.querySelector("#vistaConsignar");
const vistaTransferir = document.querySelector("#vistaTransferir");
const vistaRetirar = document.querySelector("#vistaRetirar");
const continuar = document.querySelector('#continuar')
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
      textoIntentos.textContent = "Le quedan 2 intentos";
    } else if (contadorIntentos == 2) {
      textoIntentos.textContent = "Le queda 1 intento";
    }
  }

  if (contadorIntentos >= 3) {
    formulario.remove();
    titulo.textContent = "bloqueado";
    formulario.append(titulo);
  }
};

const expresiones = {
  numeros: /[0-9]+$/gm,
  dinero: /^((\d+)|(\d{1,3}(\.\d{3})+)|(\d{1,3}(\.\d{3})(\,\d{3})+))(\,\d{2})?$/gm
};
const contadorInputsValidos = 0;
function validarFormulario(e) {
  switch (e.target.name) {
    case "cuentaConsignar":
      if (expresiones.numeros.test(e.target.value)) {
        cuentaConsignar.classList.remove("incorrecto");
        cuentaConsignar.classList.add("correcto");
      } else {
        cuentaConsignar.classList.remove("correcto");
        cuentaConsignar.classList.add("incorrecto");
      }
      break;
    case "valorAConsignar":
      if (expresiones.dinero.test(e.target.value)) {
        valorAConsignar.classList.add("correcto");
        valorAConsignar.classList.remove("incorrecto");
      } else {
        valorAConsignar.classList.remove("correcto");
        valorAConsignar.classList.add("incorrecto");
      }
      break;
    case "inputretirar":
      if (expresiones.dinero.test(e.target.value)) {
        valorARetirar.classList.add("correcto");
        valorARetirar.classList.remove("incorrecto");
      } else {
        valorARetirar.classList.remove("correcto");
        valorARetirar.classList.add("incorrecto");
      }
      break;
    case "valorTransferir":
      if (expresiones.dinero.test(e.target.value)) {
        valorTransferir.classList.add("correcto");
        valorTransferir.classList.remove("incorrecto");
      } else {
        valorTransferir.classList.remove("correcto");
        valorTransferir.classList.add("incorrecto");
      }
      break;
    case "cuentaTransferir":
      if (expresiones.numeros.test(e.target.value)) {
        cuentaTransferir.classList.add("correcto");
        cuentaTransferir.classList.remove("incorrecto");
      } else {
        cuentaTransferir.classList.remove("correcto");
        cuentaTransferir.classList.add("incorrecto");
      }
      break;
  }
}
const salir = () => {
  location.href = "/index.html";
};
const siguiente =() =>{
  continuar.style.display='flex'
  vistaConsultar.style.display = 'none'
  vistaConsignar.style.display = 'none'
  vistaRetirar.style.display = 'none'
  vistaTransferir.style.display = 'none'
}
const verSaldo = () => {
  vistaConsultar.style.display = "flex";
  vistaConsignar.style.display = "none";
  vistaRetirar.style.display = "none";
  vistaTransferir.style.display = "none";
  continuar.style.display='none'
  const saludo = document.querySelector("#saludoSaldo");
  saludo.textContent = `Hola.. su saldo disponible es`;
};
function consultarSaldo() {
  const texto = document.querySelector("#verSaldo");
  const modalHistorial = document.querySelector('#historialConsultas')
  const contenidoModal = document.createElement('section')
  const nuevaFecha = new Date();
  contenidoModal.innerHTML+=`<h5>Fecha consulta</h5>
  <p>${nuevaFecha}</p>
  <h5>$${saldo}</h5><hr>`
  texto.textContent = `$${saldo}`;
  modalHistorial.append(contenidoModal)
}

const seccionConsignar = () => {
  vistaConsignar.style.display = "flex";
  vistaConsultar.style.display = "none";
  vistaRetirar.style.display = "none";
  vistaTransferir.style.display = "none";
  continuar.style.display='none'
  inputs.forEach((input) => {
    input.addEventListener("keydown", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });
};

const consignar = () => {
  const valorAConsignar = document.querySelector("#valorAConsignar");
  const pFechaConsignado = document.querySelector("#pFechaConsignado");
  const pValorConsignado = document.querySelector("#pValorConsignado");
  const tituloModal = document.querySelector("#tituloConsignar");
  const iconoHecho = document.querySelector("#modalConsig #iconoVerdeModal");
  const iconoIncorrecto = document.querySelector('#modalConsig #iconoRojoModal')
  const titulosModal = document.querySelectorAll("#modalConsig #h4");
  const modalHistorial = document.querySelector('#historialConsignar')
  const contenidoModal = document.createElement('section')
  const nuevaFecha = new Date();
  if (valorAConsignar != (expresiones.dinero).test(valorAConsignar.value) && 
  valorAConsignar.value >1) {
    saldo += parseInt(valorAConsignar.value);
    tituloModal.textContent = "¡Consignación éxitosa!";
    for (let i = 0; i < titulosModal.length; i++) {
      const element = titulosModal[i];
      element.style.display = 'block'
    }
    iconoHecho.style.display = 'block'
    iconoIncorrecto.style.display = 'none'
    pValorConsignado.textContent = `$${valorAConsignar.value}`;
    pFechaConsignado.textContent = `${nuevaFecha}`;
    contenidoModal.innerHTML+=`<h5>Fecha consignación</h5>
  <p>${nuevaFecha}</p>
  <h5>Valor consignado</h5>
  <h5 style="color:green;">$+${valorAConsignar.value}</h5><hr>`
  modalHistorial.append(contenidoModal)
  valorAConsignar.value = "";
  } else {
    tituloModal.textContent = "¡Ingrese datos válidos!";
    for (let i = 0; i < titulosModal.length; i++) {
      const element = titulosModal[i];
      element.style.display = 'none'
    }
    pValorConsignado.textContent = ''
    pFechaConsignado.textContent = ''
    iconoIncorrecto.style.display = 'block'
    iconoHecho.style.display = 'none'
    valorAConsignar.value = "";
  }
};

const seccionRetirar = () => {
  vistaRetirar.style.display = "flex";
  vistaConsignar.style.display = "none";
  vistaConsultar.style.display = "none";
  vistaTransferir.style.display = "none";
  continuar.style.display='none'
  inputs.forEach((input) => {
    input.addEventListener("keydown", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });
};
const retirar = () => {
  const valorARetirar = document.querySelector("#valorARetirar");
  const pFechaRetirado = document.querySelector("#pFechaRetirado");
  const pValorRetirado = document.querySelector("#pValorRetirado");
  const tituloModal = document.querySelector("#tituloModalRetiro");
  const iconoHecho = document.querySelector("#modalRetirar #iconoVerdeModal");
  const iconoIncorrecto = document.querySelector('#modalRetirar #iconoRojoModal')
  const titulosModal = document.querySelectorAll("#modalRetirar #h4");
  const modalHistorial = document.querySelector('#historialRetiros')
  const contenidoModal = document.createElement('section')
  const nuevaFecha = new Date();
  if (parseInt(valorARetirar.value) <= saldo) {
    if ( valorARetirar != (expresiones.dinero).test(valorARetirar.value)) {
      saldo -= parseInt(valorARetirar.value);
      tituloModal.textContent = "¡Retiro éxitoso!";
    for (let i = 0; i < titulosModal.length; i++) {
      const element = titulosModal[i];
      element.style.display = 'block'
    }
    iconoHecho.style.display = 'block'
    iconoIncorrecto.style.display = 'none'
    pValorRetirado.textContent = `$${valorARetirar.value}`;
    pFechaRetirado.textContent = `${nuevaFecha}`;
    contenidoModal.innerHTML+=`<h5>Fecha retiro</h5>
  <p>${nuevaFecha}</p>
  <h5>Valor retirado</h5>
  <h5 style="color:red;">$-${valorARetirar.value}</h5><hr>`
  modalHistorial.append(contenidoModal)
    valorARetirar.value = "";
    }
  } else if (parseInt(valorARetirar.value) > saldo) {
    tituloModal.textContent = "¡Saldo insuficiente!";
    iconoIncorrecto.style.display = 'block'
    iconoHecho.style.display = 'none'
    for (let i = 0; i < titulosModal.length; i++) {
      const element = titulosModal[i];
      element.style.display = 'none'
    }
    pFechaRetirado.textContent=''
    pValorRetirado.textContent=''
    valorARetirar.value = "";
  }else {
    tituloModal.textContent = "¡Ingrese datos válidos!";
    for (let i = 0; i < titulosModal.length; i++) {
      const element = titulosModal[i];
      element.style.display = 'none'
    }
    pFechaRetirado.textContent=''
    pValorRetirado.textContent=''
    valorARetirar.value = "";
    iconoIncorrecto.style.display = 'block'
    iconoHecho.style.display = 'none'
  }
};

const seccionTransferir = () => {
  vistaTransferir.style.display = "flex";
  vistaConsignar.style.display = "none";
  vistaRetirar.style.display = "none";
  vistaConsultar.style.display = "none";
  continuar.style.display='none'
  inputs.forEach((input) => {
    input.addEventListener("keydown", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });
};
let acumulado = 0
const transferir = () => {
  const valorTransferir = document.querySelector("#valorTransferir");
  const cuentaTransferir = document.querySelector("#cuentaTransferir");
  const pFechaTransferido = document.querySelector("#pFechaTransferido");
  const pValorTransferido = document.querySelector("#pValorTransferido");
  const pCuentaTransferido = document.querySelector("#pCuentaTransferido");
  const pBancoTransferido = document.querySelector("#pBancoTransferido");
  const nuevaFecha = new Date();
  const seleccionar = document.querySelector("#listaBancos");
  const tituloModal = document.querySelector("#tituloTransferencia");
  const iconoHecho = document.querySelector("#modalTrans #iconoVerdeModal");
  const iconoIncorrecto = document.querySelector('#modalTrans #iconoRojoModal')
  const titulosModal = document.querySelectorAll("#modalTrans #h4");
  const modalHistorial = document.querySelector('#historialTransferido')
  const contenidoModal = document.createElement('section')
  const opciones = seleccionar.options[seleccionar.selectedIndex];
  const mostrarAcumulado =document.querySelector('#mostrarAcumulado')
  if (parseInt(valorTransferir.value) > saldo) {
    tituloModal.textContent = "¡Saldo insuficiente!";
    iconoIncorrecto.style.display = 'block'
    iconoHecho.style.display = 'none'
    for (let i = 0; i < titulosModal.length; i++) {
      const element = titulosModal[i];
      element.style.display = 'none'
    }
    pBancoTransferido.textContent = ''
    pValorTransferido.textContent = ''
    pFechaTransferido.textContent = ''
    pCuentaTransferido.textContent = ''
    valorTransferir.value = "";
    cuentaTransferir.value = "";
  } else if (parseInt(valorTransferir.value) <= saldo) {
    if (valorTransferir != (expresiones.dinero).test(valorTransferir.value) &&
      cuentaTransferir != (expresiones.numeros).test(cuentaTransferir.value)) {
      saldo -= parseInt(valorTransferir.value);
      tituloModal.textContent = "¡Tranferencia éxitosa!";
      for (let i = 0; i < titulosModal.length; i++) {
        const element = titulosModal[i];
        element.style.display = 'block'
      }
      iconoHecho.style.display = 'block'
      iconoIncorrecto.style.display = 'none'
      pValorTransferido.textContent = `$${valorTransferir.value}`;
      pFechaTransferido.textContent = `${nuevaFecha}`;
      pBancoTransferido.textContent = `${opciones.text}`;
      pCuentaTransferido.textContent = `${cuentaTransferir.value}`;
      acumulado+=parseInt(valorTransferir.value);
      contenidoModal.innerHTML+=`<h5>Fecha transferencia</h5>
  <p>${nuevaFecha}</p>
  <h5>Cuenta destino</h5>
  <p>${cuentaTransferir.value}
  <h5>Valor transferido</h5>
  <h5 style="color:red;">$-${valorTransferir.value}</h5><hr>`
  modalHistorial.append(contenidoModal)
  mostrarAcumulado.style.color='red'
  mostrarAcumulado.textContent=`$-${acumulado}`
      valorTransferir.value = "";
      cuentaTransferir.value = "";
    }
  } else {
    tituloModal.textContent = "¡Ingrese datos válidos!";
    for (let i = 0; i < titulosModal.length; i++) {
      const element = titulosModal[i];
      element.style.display = 'none'
    }
    pBancoTransferido.textContent = ''
    pValorTransferido.textContent = ''
    pFechaTransferido.textContent = ''
    pCuentaTransferido.textContent = ''
    iconoIncorrecto.style.display = 'block'
    iconoHecho.style.display = 'none'
    valorTransferir.value = "";
    cuentaTransferir.value = "";
  }
};
