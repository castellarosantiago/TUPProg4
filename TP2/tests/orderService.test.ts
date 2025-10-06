import { describe, it, expect } from "vitest";
import { crearOrden } from "../src/services/orderService";

describe("OrderService", () => {
  it("no permite más de 5 toppings por pizza", () => {
    const orderData = {
      domicilio: "Calle Falsa 1234",
      pizzas: [
        { size: "M" as const, toppings: ["a", "b", "c", "d", "e", "f"] }
      ]
    };
    expect(() => crearOrden(orderData.domicilio, orderData.pizzas)).toThrow(/toppings/i); 
  });
  
  it('calcula precio y crea orden válida', ()=>{
    const domicilio = 'Calle Falsa 1234';
    const pizzas = [{size: 'S' as const, toppings: ['x','y']}];
    const o = crearOrden(domicilio, pizzas);
    expect(o.precio).toBeGreaterThan(0);
    expect(o.domicilio).toBe(domicilio.trim());
  });
  
  it('no permite domicilio corto', ()=>{
    expect(()=> crearOrden('short', [{size:'M' as const, toppings:[]}])).toThrow(/domicilio/i);
  });
}); 

