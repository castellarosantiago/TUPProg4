import { Vehiculo } from "./Vehiculo";

export class Moto extends Vehiculo{
    constructor(cantidadRuedas:number, marca:string, modelo:string, anio:number) {
        super(cantidadRuedas, marca, modelo, anio)
    }

    pararMotor():void{}

    arrancarMotor():void{}
}