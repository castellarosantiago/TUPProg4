import {z} from "zod";

export const pizzaSchema = z.object({
    size: z.enum(["S", "M", "L"]),
    toppings: z.array(z.string().max(5)),
});

export const orderSchema = z.object({
    domicilio: z.string().min(10),
    pizzas:z.array(pizzaSchema).min(1),
});