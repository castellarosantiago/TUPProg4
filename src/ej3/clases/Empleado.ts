export abstract class Empleado{
    protected nombre:string;
    protected salarioBase:number = 500000;
    constructor(nombre:string)
    {
        this.nombre=nombre
    }

    public getNombre(): string{
        return this.nombre
    }
    public abstract calcularSalario():number
}