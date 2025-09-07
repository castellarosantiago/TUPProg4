import { Moto } from "./Moto"

export class motoCombustible extends Moto{
    private litrosNafta:number;
    private litrosMax:number = 8;

    constructor(litrosNafta:number, cantidadRuedas:number, marca:string, modelo:string, anio:number){
        super(cantidadRuedas,marca,modelo,anio)
        this.litrosNafta = litrosNafta;
    }

    override pararMotor():void{
        console.log("Motor detenido");
    }

    override arrancarMotor():void{
        console.log("Motor prendido con la llave.");
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