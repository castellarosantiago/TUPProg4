import { Moto } from "./Moto"
import { Electrico } from "../interfaces/Electrico";

export class motoElectrica extends Moto implements Electrico{
    private cargaBateria:number;
    private cargaMax:number = 100;

    constructor(cargaBateria:number, cantidadRuedas:number, marca:string, modelo:string, anio:number){
        super(cantidadRuedas,marca,modelo,anio)
        this.cargaBateria = cargaBateria;
    }

    override pararMotor():void{
        console.log("Motor detenido");
    }

    override arrancarMotor():void{
        console.log("Motor prendido con el boton.");
    }

    combustibleBajo():void {
        if (this.litrosNafta < 3 ){
            console.log("El combustible de la moto es bajo.");
        }
    }

    cargarNafta(litros:number):void{
        let sumaLitros = this.litrosNafta + litros;
        if (sumaLitros  > this.litrosMax){
            console.log("Los litros que desea cargar sobrepasan la cantidad maxima.")
        } else {
            this.litrosMax = sumaLitros
            console.log("Cargando combustible .. ");
            console.log(`Combustible actualizado: ${this.litrosMax}`);
        }
    }
}