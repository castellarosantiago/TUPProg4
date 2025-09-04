import { FiguraGeometrica } from "./FiguraGeometrica";

export class Circulo extends FiguraGeometrica{
    radio:number;
    constructor(nombre:string, radio:number){
        super(nombre);
        this.radio=radio;
    }

    calcularArea(): number {
        return 3.14 * (this.radio)**2
    }
}