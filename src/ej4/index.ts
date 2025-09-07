import { Pajaro } from "./clases/Pajaro";
import { Zorro } from "./clases/Zorro";

console.log("=== Ejercicio 4 ===");

const pajaro = new Pajaro("Gorrión", "Gordito");
console.log(`Nombre: ${pajaro.getNombre()}. Especie: ${pajaro.getEspecie()}`);
pajaro.hacerSonido();
pajaro.volar();

const zorro = new Zorro("Zorrito", "Colorado");
console.log(`Nombre: ${zorro.getNombre()}. Especie: ${zorro.getEspecie()}`);
zorro.hacerSonido();