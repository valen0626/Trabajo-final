const main = document.querySelector("main");
let saldo = 0;
function consultarSaldo() {
  const texto = document.querySelector("p");
  texto.textContent = `Su saldo es de: $${saldo}`;
}
const salir = () => {
  location.href = "/index.html";
};
const consignar = () => {
  const valorAConsignar = document.querySelector("#valorAConsignar");
  const numeroCuenta = document.querySelector("#numeroCuenta");
  const consignarHecho = document.createElement("section");
  const nuevaFecha = new Date();
  consignarHecho.classList.add("comprobante");
  consignarHecho.innerHTML += `<h1>!Consignación éxitosa¡</h1>
    <p><h2>Numero de cuenta: </h2>${numeroCuenta.value}</p>
    <p><h2>Valor Consignado: </h2>${valorAConsignar.value}</p>
    <p><h2>Fecha: </h2>${nuevaFecha}</p>`;
  main.append(consignarHecho);
  saldo += parseInt(valorAConsignar.value);
};

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
