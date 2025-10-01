// import {Order} from "../orderModel";

// const ordenes: Order[] = [];

// function calcularPrecio(pizzas: {size: "S" | "M" | "L";toppings:string[]}[]):number{
//     const precios = {S: 12000, M: 18000, L: 22000};
//     return pizzas.reduce(
//         (total, pizza) =>
//             total + precios[pizza.size] + pizza.toppings.length *100, 0
//     );
// }

// export function crearOrden(domicilio:string, pizzas: { size: "S" | "M" | "L"; toppings: string[] }[]):Order{
//     //5 toppings por pizza
//     for(const pizza of pizzas){
//         if(pizza.toppings.length > 5){
//             throw new Error("No se permiten más de 5 toppings por pizza");
//         }
//     }
//     if(pizzas.length===0){
//         throw new Error("La orden debe tener al menos una pizza");
//     }
    
//     const nuevaOrden: Order = {
//         id:(ordenes.length+1).toString(),
//         domicilio,
//         pizzas,
//         estado:"pendiente",
//         precio: calcularPrecio(pizzas),
//     };
//     ordenes.push(nuevaOrden);
//     return nuevaOrden;
// }


// import order from '../models/orderModel';


// export const findAll = ()=> orderModel.find().lean();
// export const findById = (id: string) => orderModel.findById(id).lean()
// export const create = (order:Order)


import { stringify } from "querystring";
import {Order, Pizza, OrderState} from "../models/orderModel";

class HttpError extends Error {
    status:number;
    constructor(message:string, status = 500){
        super(message);
        this.status = status;
    }
}

const orders: Order[] = [];

function calcularPrecio(pizzas:Pizza[]):number{
    const base = {S: 5000, M: 8000, L: 14000} as Record<string, number>;
    const toppingPrice = 1500;
    return pizzas.reduce((acc, p) => acc + base[p.size] + p.toppings.length * toppingPrice, 0);
}

export function crearOrden(domicilio:string, pizzas:Pizza[]):Order{
    if(!Array.isArray(pizzas) || pizzas.length ===0){
        throw new HttpError("el arreglo de pizzas no puede estar vacío", 422);
    }
    if(typeof domicilio !== "string" || domicilio.trim().length <10){
        throw new HttpError("el domicilio tiene que tener por lo menos 10 caracteres", 422);
    }
    for(const p of pizzas){
        if(!["S", "M", "L"].includes(p.size)){
            throw new HttpError("el tamaño debe ser S, M o L", 422);
        }
        if(!Array.isArray(p.toppings)){
            throw new HttpError("toppings debe ser un arreglo", 422);
        }
        if(p.toppings.length>5){
            throw new HttpError("no se permiten más de 5 toppings por pizza", 422);
        }
    }

    const nueva:Order = {
        id:"string",
        domicilio:domicilio.trim(),
        pizzas,
        estado:"pendiente",
        precio:calcularPrecio(pizzas),
    };
    orders.push(nueva);
    return nueva;
}

export function getOrdenes(filtrarEstado?:OrderState){
    if(filtrarEstado) return orders.filter((o)=> o.estado ===filtrarEstado);
    return [...orders];
}

export function getOrden(id:string):Order{
    const o = orders.find((x)=> x.id ===id);
    if(!o) throw new HttpError("orden no encontrada", 404);
    return o;
}

export function obtenerOrden(id:string):Order{
    const o= orders.find((x)=> x.id ===id);
    if(!o) throw new HttpError("orden no encontrada", 404);
    return o;
}

export function cancelarOrden(id:string):Order{
    const o = orders.find((x)=> x.id ===id);
    if(!o) throw new HttpError("orden no encontrada", 404);
    if(o.estado === "entregado"){
        throw new HttpError("no se puede cancelar una orden entregada", 409);
    }
    if(o.estado ==="cancelado") return o;
        o.estado = "cancelado";
        return o;
}

//funciones para tests - limpiar el arreglo para cada prueba

export function resetOrders(){
    orders.length = 0;
}

export { HttpError};

export * from "./orderService";