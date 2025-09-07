import { Electrico } from "../interfaces/Electrico";
import { Auto } from "./Auto";

export class AutoElectrico extends Auto implements Electrico{
    cargaBateria: number;
    cargaMaxima: number = 100;
    constructor(cantidadRuedas:number, marca:string, modelo:string, anio:number, cargaBateria:number){
        super(cantidadRuedas, marca, modelo, anio);
        this.cargaBateria=cargaBateria;
    }

    
    override arrancarMotor(): void {
        console.log("Motor encendido por boton");
    }

    pararMotor(): void {
        console.log("Motor detenido");
    }

    async cargarBateria() {
        console.log((`Cargando: ${this.cargaBateria}%`))
        while (this.cargaBateria < this.cargaMaxima){
            this.cargaBateria += 1;
        }
        
    }
    bateriaBaja(): void {
        
    }

}