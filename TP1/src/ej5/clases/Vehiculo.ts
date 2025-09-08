export abstract class Vehiculo{
    protected cantidadRuedas:number;
    protected marca:string;
    protected modelo:string;
    protected anio:number;

    constructor(cantidadRuedas:number, marca:string, modelo:string, anio:number){
        this.cantidadRuedas=cantidadRuedas;
        this.marca=marca;
        this.modelo=modelo;
        this.anio=anio;
    }

    abstract pararMotor():void;
    abstract arrancarMotor():void;
}