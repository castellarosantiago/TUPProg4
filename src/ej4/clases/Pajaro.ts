import { Volador } from "../interfaces/Volador";
import {Animal} from "./Animal"

export class Pajaro extends Animal implements Volador {
    private especie:string;
    constructor(nombre:string){
        super(nombre);
        
    }
    hacerSonido(): void {
        console.log("Pio, pio 😎");
    }
    volar():void{
        console.log("El pajaro vuela 🦅")
    }
}
