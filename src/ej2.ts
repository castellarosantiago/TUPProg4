export abstract class FiguraGeometrica{
    protected nombre:string
    constructor(nombre:string){
     this.nombre=nombre;   
    }
    abstract calcularArea():number;
}

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

