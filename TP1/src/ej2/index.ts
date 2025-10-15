import { Circulo } from "./clases/Circulo";
import { Cuadrado } from "./clases/Cuadrado";
import { Triangulo } from "./clases/Triangulo";

console.log("=== Ejercicio 2 ===");

const circulo = new Circulo("Circulo", 5);
console.log(`Área del círculo: ${circulo.calcularArea()}`);

const cuadrado = new Cuadrado("Cuadrado",4);
console.log(`Área del cuadrado: ${cuadrado.calcularArea()}`);

const triangulo = new Triangulo("Triangulo", 4, 5); // base, lado2, lado3, altura
console.log(`Área del triángulo: ${triangulo.calcularArea()}`);
