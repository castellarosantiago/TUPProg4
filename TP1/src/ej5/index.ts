import { Auto } from "./clases/Auto";
import { autoElectrico } from "./clases/autoElectrico";
import { autoCombustible } from "./clases/autoCombustible";
import { Moto } from "./clases/Moto";
import { motoElectrica } from "./clases/motoElectrica";
import { motoCombustible } from "./clases/motoCombustible";

console.log("=== Ejercicio 5 ===");

function sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms))
        
    
}

// const auto1 = new Auto(4, "Ford", "Focus", 2018);
// console.log(auto1);

// const autoElec = new autoElectrico(4, "Tesla", "Model 3", 2022, 80);
// console.log(autoElec);
// sleep(5000);
// autoElec.cargarBateria();

// const autoComb = new autoCombustible(40, 52, 4,"Toyota", "Corolla", 2020);
// console.log(autoComb);

// const moto1 = new Moto(2, "Honda", "CBR", 2019);
// console.log(moto1);

// const motoElec = new motoElectrica(50, 2, "Super Soco", "TC", 2023);
// console.log(motoElec);
// sleep(5000);
// motoElec.cargarBateria();

const motoComb = new motoCombustible(1, 2, "Yamaha", "FZ", 2021);
console.log(motoComb);
sleep(5000);
motoComb.cargarNafta()