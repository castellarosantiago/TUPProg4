export abstract class Empleado{
    protected nombre:string;
    protected salarioBase:number = 500000;
    constructor(nombre:string)
    {
        this.nombre=nombre
    }
    abstract calcularSalario():number
}