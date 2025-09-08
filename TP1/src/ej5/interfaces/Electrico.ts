export interface Electrico{
    cargaBateria:number;
    cargaMaxima:number;
    bateriaBaja():void;
    cargarBateria():void;
}