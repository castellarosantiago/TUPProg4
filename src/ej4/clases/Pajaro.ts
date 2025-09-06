import {Animal} from "./Animal"

export class Pajaro extends Animal {
    private especie:string;
    constructor(nombre:string){
        super(nombre);
    }
    hacerSonido(): void {
        console.log("Pio, pio 😎");
    }
}
