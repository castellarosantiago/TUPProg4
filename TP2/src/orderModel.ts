export type OrderStatus = "pendiente" | "entregado" | "cancelado";
export interface Order {
    id: string;
    domicilio:string;
    pizzas:{size: "S" | "M" | "L", toppings:string[]}[];
    precio:number;
    estado: OrderStatus;
}

