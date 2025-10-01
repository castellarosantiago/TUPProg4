// export type OrderStatus = "pendiente" | "entregado" | "cancelado";
// export interface Order {
//     id: string;
//     domicilio:string;
//     pizzas:{size: "S" | "M" | "L", toppings:string[]}[];
//     precio:number;
//     estado: OrderStatus;
// }

export type PizzaSize = "S" | "M" | "L";
export type OrderState = "pendiente" | "entregado" | "cancelado";

export interface Pizza {
    size: PizzaSize;
    toppings: string[];
}

export interface Order{
    id: string;
    domicilio: string;
    pizzas: Pizza[];
    estado: OrderState;
    precio:number;
}
