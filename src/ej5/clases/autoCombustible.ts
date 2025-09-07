import { Auto } from "./Auto"

function sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class motoCombustible extends Auto{
    private litrosNafta:number;
    private litrosMax:number;

    constructor(litrosNafta:number, cantidadRuedas:number, marca:string, modelo:string, anio:number){
        super(cantidadRuedas,marca,modelo,anio)
        this.litrosNafta = litrosNafta;
    }

    override pararMotor():void{
        console.log("Motor detenido");
    }

    override arrancarMotor():void{
        console.log("Motor prendido con la llave.");
    }


    async cargarNafta(){
        console.log("Cargando nafta...");
        while(this.litrosNafta < this.litrosMax){
            this.litrosNafta += 1;
            console.log(`Litros cargados: ${this.litrosNafta}`)
            await sleep(1000);
        }
        console.log("Tanque lleno.")
    }

    combustibleBajo():void {
        if (this.litrosNafta < 10 ){
            console.log("El combustible del auto es bajo.");
        }
    }
}