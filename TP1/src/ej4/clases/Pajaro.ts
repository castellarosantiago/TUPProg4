import { Volador } from "../interfaces/Volador";
import {Animal} from "./Animal"

export class Pajaro extends Animal implements Volador {
    protected especie:string;
    constructor(nombre:string, especie:string){
        super(nombre);
        this.especie = especie
    }

    public getEspecie(){
        return this.especie;
    }

    hacerSonido(): void {
        console.log("'Pio, pio 😎'");
    }
    volar():void{
        console.log(`El ${this.nombre} vuela 🦅`)
    }
}
