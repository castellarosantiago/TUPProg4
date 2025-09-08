import { Animal } from "./Animal";

export class Zorro extends Animal{
    protected especie:string;
    constructor(nombre:string, especie:string){
        super(nombre);
        this.especie=especie;
    }

    public getEspecie(){
        return this.especie;
    }

    hacerSonido(): void {
        console.log("'Ninininini'");
    }
} 