import { describe, it, expect } from "vitest";
import { crearOrden } from "../src/orderService";

describe("OrderService", () => {
  it("no permite más de 5 toppings por pizza", () => {
    const orderData = {
      domicilio: "Calle Falsa 1234",
      pizzas: [
        { size: "M" as const, toppings: ["a", "b", "c", "d", "e", "f"] }
      ]
    };
    expect(() => crearOrden (orderData)).toThrow(/toppings/i); 
  });
}); 

