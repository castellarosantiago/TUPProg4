import {Order} from "./orderModel";

const ordenes: Order[] = [];

function calcularPrecio(pizzas: {size: "S" | "M" | "L";toppings:string[]}[]):number{
    const precios = {S: 12000, M: 18000, L: 22000};
    return pizzas.reduce(
        (total, pizza) =>
            total + precios[pizza.size] + pizza.toppings.length *100, 0
    );
}

export function crearOrden(domicilio:string, pizzas: { size: "S" | "M" | "L"; toppings: string[] }[]):Order{
    //5 toppings por pizza
    for(const pizza of pizzas){
        if(pizza.toppings.length > 5){
            throw new Error("No se permiten más de 5 toppings por pizza");
        }
    }
    if(pizzas.length===0){
        throw new Error("La orden debe tener al menos una pizza");
    }
    
    const nuevaOrden: Order = {
        id:(ordenes.length+1).toString(),
        domicilio,
        pizzas,
        estado:"pendiente",
        precio: calcularPrecio(pizzas),
    };
    ordenes.push(nuevaOrden);
    return nuevaOrden;
}


// export function crearOrden(domicilio:string, pizzas:{size: "S" | "M" | "L", toppings:string[]}[]):Order{
//     const order:Order = 
//     ordenes.push(order)
//     throw new Error("No hay una implementacion minima");
// }

