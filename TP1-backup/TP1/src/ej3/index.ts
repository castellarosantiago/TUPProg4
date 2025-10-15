import { EmpleadoTiempoCompleto } from "./clases/EmpleadoTiempoCompleto";
import { EmpleadoMedioTiempo } from "./clases/EmpleadoMedioTiempo";
import { mostrarEmpleados, calcularSueldoTotal } from "./arregloEmpleados";

console.log("=== Ejercicio 3 ===");

const empleados = [
  new EmpleadoTiempoCompleto("Marcelo"),
  new EmpleadoMedioTiempo("Luis"),
  new EmpleadoTiempoCompleto("Pedro"),
  new EmpleadoMedioTiempo("Jorge")
];

mostrarEmpleados(empleados);

const total = calcularSueldoTotal(empleados);
console.log(`Sueldo total a pagar: $${total}`);