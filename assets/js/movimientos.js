const main = document.querySelector("main");
let saldo = 0;
function consultarSaldo() {
  const texto = document.querySelector("p");
  texto.textContent = `SU SALDO ES DE: $${saldo}`;
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
  consignarHecho.innerHTML += `<h3>!CONSIGNACIÓN ÉXITOSA¡</h3>
    <p><h4>NUMERO DE CUENTA: </h4>${numeroCuenta.value}</p>
    <p><h4>VALOR CONSIGNADO: </h4>${valorAConsignar.value}</p>
    <p><h5>FECHA DE LA CONSIGNACIÓN: </h5>${nuevaFecha}</p>`;
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
    retirarHecho.innerHTML += `<h3>!RETIRO ÉXITOSO¡</h3>
    <p><h4>VALOR RETIRADO: </h4>${valorARetirar.value}</p>
    <p><h5>FECHA DEL RETIRO: </h5>${nuevaFecha}</p>`;
    main.append(retirarHecho);
  } else if (parseInt(valorARetirar.value) > saldo) {
    alert("!SALDO INSUFICIENTE¡");
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
      transferirHecho.innerHTML += `<h3>!TRANSFERENCIA ÉXITOSA¡</h3>
      <h4>NÚMERO DE CUENTA: </h4><p>${numeroCuenta.value}</p>
      <h4>BANCO: </h4><p>${opciones.text}</p>
      <h4>VALOR TRANSFERIDO: </h4><p>${valorTransferir.value}</p>
      <h5>FECHA DE LA TRANSFERENCIA: </h5><p>${nuevaFecha}</p>`;
      main.append(transferirHecho);
    } else if (parseInt(valorTransferir.value) > saldo) {
      alert("!SALDO INSUFICIENTE¡");
      valorTransferir.value = "";
    }
  };
