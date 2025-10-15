export abstract class Animal{
    protected nombre:string;

    constructor(nombre:string){
        this.nombre=nombre
    }
    
    public getNombre(){
        return this.nombre;
    }
    
    public abstract hacerSonido():void
}