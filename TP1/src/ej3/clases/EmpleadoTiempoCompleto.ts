import { Empleado } from "./Empleado";

export class EmpleadoTiempoCompleto extends Empleado{
    private salarioTiempoCompleto:number;

    constructor(nombre:string){
        super(nombre)
        this.salarioTiempoCompleto = 0;
    }

    calcularSalario():number {
        this.salarioTiempoCompleto = this.salarioBase + 20000
        return this.salarioTiempoCompleto;
    }
}
