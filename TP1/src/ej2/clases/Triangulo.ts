import { FiguraGeometrica } from "./FiguraGeometrica";

export class Triangulo extends FiguraGeometrica{
    base:number;
    altura:number;
    constructor(nombre:string, base:number, altura:number){
        super(nombre);
        this.base=base;
        this.altura=altura;
    }
    calcularArea(): number {
        return (this.base * this.altura) / 2
    }
}

