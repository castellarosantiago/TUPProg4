¡Excelente! Te armo una **guía paso a paso** para que tu grupo pueda desarrollar la API de pedidos de pizzería usando **TypeScript + Express + Zod + Vitest** siguiendo TDD, con datos en memoria.

---

## 1. **Estructura inicial del proyecto**

```
/src
  /app
    app.ts         // makeApp()
    routes.ts
    orderService.ts
    orderModel.ts
    orderSchema.ts
  /tests
    orderService.test.ts
    orderRoutes.test.ts
  server.ts        // solo listen
package.json
tsconfig.json
README.md
TEORIA.md
```

---

## 2. **Instalación de dependencias**

```bash
npm init -y
npm install express zod
npm install -D typescript vitest supertest @types/express @types/node ts-node
```

---

## 3. **TDD: Ciclo recomendado**

1. **Test unitario (servicio):**  
   Escribe un test para una regla de negocio (ej: no más de 5 toppings).
2. **Implementación mínima:**  
   Haz lo mínimo para que el test pase.
3. **Test de integración (endpoint):**  
   Escribe un test con Supertest para el endpoint (ej: POST /orders).
4. **Implementación mínima:**  
   Haz lo mínimo para que el test pase.
5. **Refactor:**  
   Mejora nombres, estructura, helpers, etc.  
   ¡Siempre manteniendo los tests en verde!
6. **Repite por cada user story.**

---

## 4. **Primeros pasos prácticos**

### a) **Crea el modelo y el servicio**

`src/app/orderModel.ts`
```typescript
export type OrderStatus = "pending" | "delivered" | "cancelled";
export interface Order {
  id: string;
  address: string;
  items: { size: "S" | "M" | "L"; toppings: string[] }[];
  status: OrderStatus;
  price: number;
}
```

`src/app/orderService.ts`
```typescript
import { Order } from "./orderModel";

const orders: Order[] = [];

export function createOrder(order: Omit<Order, "id" | "status" | "price">): Order {
  // Implementación mínima para el primer test
  throw new Error("Not implemented");
}

// ...otros métodos (get, cancel, etc.)
```

### b) **Primer test unitario (rojo)**

`src/tests/orderService.test.ts`
```typescript
import { describe, it, expect } from "vitest";
import { createOrder } from "../app/orderService";

describe("OrderService", () => {
  it("no permite más de 5 toppings por pizza", () => {
    const orderData = {
      address: "Calle Falsa 1234",
      items: [
        { size: "M", toppings: ["a", "b", "c", "d", "e", "f"] }
      ]
    };
    expect(() => createOrder(orderData)).toThrow(/toppings/i);
  });
});
```

### c) **Implementa lo mínimo para pasar el test (verde)**

En `createOrder`, valida la cantidad de toppings y lanza error si hay más de 5.

---

## 5. **Validaciones con Zod**

`src/app/orderSchema.ts`
```typescript
import { z } from "zod";

export const orderItemSchema = z.object({
  size: z.enum(["S", "M", "L"]),
  toppings: z.array(z.string()).max(5)
});

export const orderSchema = z.object({
  address: z.string().min(10),
  items: z.array(orderItemSchema).min(1)
});
```

En el endpoint, usa `orderSchema.safeParse(req.body)`.

---

## 6. **Separar app de server**

`src/app/app.ts`
```typescript
import express from "express";
import { orderRoutes } from "./routes";

export function makeApp() {
  const app = express();
  app.use(express.json());
  app.use("/orders", orderRoutes);
  return app;
}
```

`src/server.ts`
```typescript
import { makeApp } from "./app/app";
const app = makeApp();
app.listen(3000, () => console.log("Server running"));
```

---

## 7. **Test de integración con Supertest**

`src/tests/orderRoutes.test.ts`
```typescript
import { describe, it, expect } from "vitest";
import request from "supertest";
import { makeApp } from "../app/app";

describe("POST /orders", () => {
  it("crea un pedido válido", async () => {
    const res = await request(makeApp())
      .post("/orders")
      .send({
        address: "Calle Falsa 1234",
        items: [{ size: "M", toppings: ["a", "b"] }]
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});
```

---

## 8. **Guía de scripts en package.json**

```json
"scripts": {
  "dev": "ts-node src/server.ts",
  "test": "vitest run --coverage"
}
```

---

## 9. **README.md: ejemplos curl y matriz de casos**

Incluye ejemplos como:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"address":"Calle Falsa 1234","items":[{"size":"M","toppings":["a","b"]}]}'
```

Y una tabla de matriz de casos (CA ↔ tests).

---

## 10. **Consejos para el grupo**

- **Commits pequeños:** Un commit por cada ciclo rojo→verde→refactor.
- **Tests primero:** No escriban código de la app sin antes escribir el test.
- **Cobertura:** Revisen con `vitest run --coverage`.
- **No listen en tests:** Usen `makeApp()` en tests, no el server real.
- **Datos en memoria:** Usen un arreglo para guardar los pedidos.

---

¿Quieren un ejemplo de cómo implementar el primer endpoint y su test? ¿O ayuda con la estructura de carpetas y archivos?