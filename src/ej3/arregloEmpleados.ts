import { Empleado } from "./clases/Empleado";
import { EmpleadoMedioTiempo } from "./clases/EmpleadoMedioTiempo";
import { EmpleadoTiempoCompleto } from "./clases/EmpleadoTiempoCompleto";

let arregloEmpleados: Empleado[] = [ new EmpleadoMedioTiempo("Rodrigo",), new EmpleadoTiempoCompleto("Marcelo"), new EmpleadoMedioTiempo("Giuseppe")];

arregloEmpleados.forEach((empleado) => {
    console.log(
        `Empleado: ${empleado["nombre"]}, Salario calculado: ${empleado.calcularSalario()}`
    );
});