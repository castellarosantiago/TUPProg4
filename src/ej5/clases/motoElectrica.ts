import { Moto } from "./Moto"
import { Electrico } from "../interfaces/Electrico";


    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    
export class motoElectrica extends Moto implements Electrico{
    cargaBateria:number;
    cargaMaxima:number = 100;

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

    async cargarBateria() {
        console.log((`Cargando bateria...`))
        while (this.cargaBateria < this.cargaMaxima){
            this.cargaBateria += 1;
            console.log(`Progreso de carga: ${this.cargaBateria}%`)
            await sleep(1000);
        }  
        console.log("Bateria completamente cargada")
    }

    bateriaBaja(): void {
        if (this.cargaBateria<20){
            console.log("Nivel de bateria bajo! Considere cargar el vehiculo.")
        }
    }
}