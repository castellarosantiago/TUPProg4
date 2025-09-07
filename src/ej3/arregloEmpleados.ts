import { Empleado } from "./clases/Empleado";

export function mostrarEmpleados(empleados: Empleado[]): void {
  empleados.forEach(e =>
    console.log(`${e.getNombre()} - Sueldo: $${e.calcularSalario()}`)
  );
}

export function calcularSueldoTotal(empleados: Empleado[]): number {
  return empleados.reduce((total, e) => total + e.calcularSalario(), 0);
}