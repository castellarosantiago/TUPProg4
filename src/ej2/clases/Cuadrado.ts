import { FiguraGeometrica } from "./FiguraGeometrica";

export class Cuadrado extends FiguraGeometrica{
    lado:number;
    constructor(nombre:string, lado:number){
        super(nombre);
        this.lado=lado;
    }

    calcularArea(): number {
       return this.lado**2
    }

}