import { Empleado } from "./Empleado";

export class EmpleadoMedioTiempo extends Empleado{
    private salarioMedioTiempo:number;

    constructor(nombre:string){
        super(nombre)
        this.salarioMedioTiempo = 0;
    }

    calcularSalario():number {
        this.salarioMedioTiempo = this.salarioBase / 2;
        return this.salarioMedioTiempo;
    }
}
