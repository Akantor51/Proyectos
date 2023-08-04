const cuentas = [
  { nombre: "Mali", saldo: 1000, contrasena: "1234" },
  { nombre: "Gera", saldo: 500, contrasena: "1234" },
  { nombre: "Maui", saldo: 1500, contrasena: "1234" },
];

let selectedAccount = null;
let operacionActual = null;

function login() {
  const selectedAccountIndex = document.getElementById("cuentas").value;
  const password = document.getElementById("password").value;
  let contrasenaCorrecta = false;

  if (cuentas[selectedAccountIndex].contrasena === password) {
    selectedAccount = cuentas[selectedAccountIndex];
    contrasenaCorrecta = true;
    mostrarInteraccion();
  }

  if (!contrasenaCorrecta) {
    alert("Contraseña incorrecta. Intente nuevamente.");
  }
}

function mostrarInteraccion() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("interaccion").style.display = "block";
  document.getElementById("bienvenido").textContent = `¡Bienvenido, ${selectedAccount.nombre}!`;
  document.getElementById("saldo").textContent = `Saldo actual: $${selectedAccount.saldo}`;
  toggleAcciones(true);
  toggleCambiarContrasena(true);
  document.getElementById("montoSection").style.display = "none"; // Oculta el formulario de ingresar o retirar monto al mostrar las interacciones
}

function cerrarSesion() {
  selectedAccount = null;
  document.getElementById("inicio").style.display = "block";
  document.getElementById("interaccion").style.display = "none";
  toggleAcciones(false);
  toggleCambiarContrasena(false);
  document.getElementById("montoSection").style.display = "none"; // Oculta el formulario de ingresar o retirar monto al cerrar sesión
}

function toggleAcciones(show) {
  const accionesDiv = document.getElementById("acciones");
  accionesDiv.style.display = show ? "flex" : "none";
}

function toggleCambiarContrasena(show) {
  const cambiarContrasenaDiv = document.getElementById("cambiarContrasenaSection");
  cambiarContrasenaDiv.style.display = show ? "block" : "none";
}

function consultarSaldo() {
  alert(`Su saldo actual es: $${selectedAccount.saldo}`);
}

function ingresarMonto() {
  document.getElementById("montoSection").style.display = "block";
  operacionActual = "ingresar";
}

function retirarMonto() {
  document.getElementById("montoSection").style.display = "block";
  operacionActual = "retirar";
}

function realizarOperacion() {
  const monto = parseInt(document.getElementById("monto").value);

  if (isNaN(monto) || monto <= 0) {
    alert("Por favor, ingrese un monto válido.");
    return;
  }

  if (operacionActual === "ingresar") {
    selectedAccount.saldo += monto;
  } else if (operacionActual === "retirar") {
    if (monto > selectedAccount.saldo) {
      alert("Saldo insuficiente para realizar la operación.");
      return;
    }
    selectedAccount.saldo -= monto;
  }

  document.getElementById("montoSection").style.display = "none"; // Oculta el formulario de ingresar o retirar monto al dar clic en "Aceptar"
  document.getElementById("monto").value = ""; // Limpia el valor del input monto
  document.getElementById("saldo").textContent = `Saldo actual: $${selectedAccount.saldo}`;
}

function cancelarOperacion() {
  document.getElementById("montoSection").style.display = "none"; // Oculta el formulario de ingresar o retirar monto al dar clic en "Cancelar"
  document.getElementById("monto").value = ""; // Limpia el valor del input monto
}

function cambiarContrasena() {
  const nuevaContrasena = document.getElementById("nuevaContrasena").value;

  if (nuevaContrasena === "") {
    alert("Por favor, ingrese una nueva contraseña.");
    return;
  }

  selectedAccount.contrasena = nuevaContrasena;
  document.getElementById("nuevaContrasena").value = "";
  alert("Contraseña cambiada con éxito.");
}

function cancelarCambioContrasena() {
  document.getElementById("cambiarContrasenaSection").style.display = "none";
}
