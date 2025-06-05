// Variables para almacenar los valores y el estado de la calculadora
let primerNumero = null;      // Guarda el primer número ingresado
let operadorSeleccionado = null; // Guarda el operador elegido: "+", "-", "*", "/"
let sePresionoOperador = false; // Bandera: si se acaba de presionar un operador

// Obtener referencias a elementos del DOM
const campoEntrada = document.getElementById("entradaCalc");
const divMostrarOperacion = document.getElementById("mostrarOperacion");
const botonesNumeros = document.querySelectorAll("[data-numero]");
const botonesOperadores = document.querySelectorAll("[data-operador]");
const botonIgual = document.getElementById("botonIgual");
const botonLimpiar = document.getElementById("botonLimpiar");

/**
 * Función para agregar un dígito al campo de entrada.
 * @param {string} digito  El dígito que se agrega.
 */
function agregarDigito(digito) {
  // Si justo se presionó un operador, limpiamos el campo antes de agregar el siguiente número
  if (sePresionoOperador) {
    campoEntrada.value = "";
    sePresionoOperador = false;
  }

  // Evitar que se escriban ceros al inicio redundantes: si el campo contiene "0", lo reemplazo
  if (campoEntrada.value === "0") {
    campoEntrada.value = digito;
  } else {
    campoEntrada.value += digito;
  }
}

/**
 * Función para manejar el clic en un botón de número.
 * Se asigna a cada botón que tenga el atributo data-numero.
 */
botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => {
    const digito = boton.getAttribute("data-numero");
    agregarDigito(digito);
  });
});

/**
 * Función para seleccionar un operador (+, -, *, /).
 * @param {string} op  El operador que se seleccionó.
 */
function seleccionarOperador(op) {
  // Si el campo de entrada está vacío, no hacemos nada
  if (campoEntrada.value === "") return;

  // Guardar el primer número ingresado (convertir de string a float)
  primerNumero = parseFloat(campoEntrada.value);

  // Guardar el operador seleccionado
  operadorSeleccionado = op;

  // Mostrar "primerNumero operador" brevemente en el div correspondiente
  divMostrarOperacion.textContent = `${primerNumero} ${operadorSeleccionado}`;

  // Indicar que se presionó un operador para limpiar el campo en la siguiente entrada
  sePresionoOperador = true;
}

/**
 * Asignar la función seleccionarOperador a cada botón con data-operador.
 */
botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => {
    const op = boton.getAttribute("data-operador");
    seleccionarOperador(op);
  });
});

/**
 * Función para calcular el resultado al presionar el botón "=".
 * También verifica división por cero.
 */
function calcularResultado() {
  // Si no hay primer número u operador seleccionado, no se hace nada
  if (primerNumero === null || operadorSeleccionado === null) return;

  // Obtener el segundo número a partir del valor actual del campo de entrada
  const segundoNumero = parseFloat(campoEntrada.value);

  // Validación: si se intenta dividir por cero, mostrar alerta y reiniciar
  if (operadorSeleccionado === "/" && segundoNumero === 0) {
    alert("Error: División por cero no permitida");
    limpiarTodo();
    return;
  }

  // Variable para guardar el resultado final
  let resultado;

  // Realizar la operación según el operadorSeleccionado
  switch (operadorSeleccionado) {
    case "+":
      resultado = primerNumero + segundoNumero;
      break;
    case "-":
      resultado = primerNumero - segundoNumero;
      break;
    case "*":
      resultado = primerNumero * segundoNumero;
      break;
    case "/":
      resultado = primerNumero / segundoNumero;
      break;
    default:
      return;
  }

  // Mostrar el resultado en el campo de entrada
  campoEntrada.value = resultado;

  // Limpiar el div que mostraba la operación y reiniciar variables
  divMostrarOperacion.textContent = "";
  primerNumero = null;
  operadorSeleccionado = null;
  sePresionoOperador = false;
}

/**
 * Asignar la función calcularResultado al clic del botón "="
 */
botonIgual.addEventListener("click", calcularResultado);

/**
 * Función para limpiar todo (resetear calculadora).
 */
function limpiarTodo() {
  campoEntrada.value = "";
  divMostrarOperacion.textContent = "";
  primerNumero = null;
  operadorSeleccionado = null;
  sePresionoOperador = false;
}

/**
 * Asignar la función limpiarTodo al clic del botón "C"
 */
botonLimpiar.addEventListener("click", limpiarTodo);

// Al cargar la página, inicializar la calculadora llamando a limpiarTodo()
limpiarTodo();
