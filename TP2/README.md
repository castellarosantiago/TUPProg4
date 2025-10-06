# TP2 - Servicio de órdenes de pizzas

Este repositorio contiene la implementación (parcial) de un servicio REST para la gestión de órdenes de pizzas, desarrollado en TypeScript con Express. El proyecto incluye controladores, servicios, validaciones con Zod, y tests automatizados con Vitest.

## Objetivo
Implementar un API que permita crear, listar, consultar y cancelar órdenes. El código está organizado para facilitar pruebas unitarias e integración.

## Estructura relevante
- `src/server.ts` - exporta `makeApp()` que crea la app de Express usada por los tests.
- `src/routes/orderRoutes.ts` - definición de rutas `/orders`.
- `src/controllers/orderControllers.ts` - lógica de los endpoints (usa `orderSchema` y `orderService`).
- `src/services/orderService.ts` - lógica de negocio (crear orden, cancelar, obtener, etc.).
- `src/middlewares/orderSchema.ts` - esquemas de validación con Zod.
- `tests/` - tests con Vitest y Supertest.

## Instalación
Desde PowerShell en Windows (carpeta del proyecto):

```powershell
npm install
```

## Scripts disponibles
- `npm test` - ejecuta los tests con Vitest.
- `npm run coverage` - ejecuta Vitest con cobertura (v8) y genera el reporte.

Ejecutar tests:

```powershell
npm run test
```

Generar reporte de cobertura:

```powershell
npm run coverage
```


## API (endpoints)
Base: `/orders`

- GET `/orders`
  - Descripción: devuelve todas las órdenes.
  - Respuesta 200: array de órdenes.

- GET `/orders/:id`
  - Descripción: devuelve una orden por `id`.
  - Respuesta 200: objeto orden.
  - Respuesta 404: orden no encontrada.

- POST `/orders`
  - Descripción: crea una orden.
  - Body JSON esperado:
    ```json
    {
      "domicilio": "Calle Ejemplo 1234",
      "pizzas": [ { "size": "M", "toppings": ["a", "b"] } ]
    }
    ```
  - Validaciones (ver `orderSchema` y `orderService`):
    - `domicilio`: string, mínimo 10 caracteres.
    - `pizzas`: arreglo con al menos 1 pizza.
    - `pizza.size`: uno de `"S"`, `"M"`, `"L"`.
    - `pizza.toppings`: arreglo de strings, máximo 5 toppings por pizza.
  - Respuesta 201: orden creada (incluye `id` y `precio`).
  - Respuesta 422: validación fallida.

- POST `/orders/:id/cancel`
  - Descripción: cancela una orden por id.
  - Respuesta 200: orden actualizada con `estado: "cancelado"`.
  - Respuesta 404: orden no encontrada.
  - Respuesta 409: si la orden ya fue `entregado` no se puede cancelar.

- GET `/orders/order?estado=<estado>`
  - Descripción: filtra órdenes por estado (`pendiente`, `entregado`, `cancelado`).
  - Respuesta 200: array de órdenes filtradas.
  - Respuesta 422: si no se envía `estado`.

> Nota: la aplicación exporta `makeApp()` en `src/server.ts` para facilitar su uso en tests de integración (no hay un `npm start` por defecto en `package.json`).

## Reglas de negocio importantes (service)
- Precio de una pizza: base por tamaño + 1500 por topping.
  - Base: S=5000, M=8000, L=14000.
- Se validan tamaños, cantidad de toppings y domicilio mínimo en `orderService`.
- `resetOrders()` se usa en tests para limpiar el arreglo global de órdenes.

## Tests y cobertura
- Tests actuales usan Vitest + Supertest y cubren tanto servicios como endpoints.
- Para ejecutar cobertura:

```powershell
npm run coverage
```

- Si quieres forzar reportes en formatos concretos (útil para CI):

```powershell
npm run coverage -- --reporter=lcov --reporter=text
```

## Cómo contribuir / expandir
- Añadir un `start` script que monte un servidor real (por ejemplo creando `src/index.ts` que haga `app.listen(...)`).
- Separar la generación de `id` en `orderService` (hoy devuelve `id: "string"`) y usar `uuid` para ids reales.
- Añadir más tests unitarios para alcanzar más del 80% de cobertura en `services` y `controllers`.

## Notas del entregable (observaciones del TP2)
- La validación principal está implementada con Zod en `src/middlewares/orderSchema.ts`.
- El proyecto está pensado para evaluación: tests automatizados y modularidad entre routes/controllers/services.
- Si durante los tests ves rutas que devuelven 404 cuando debería responder (por ejemplo `/orders/order`), revisa el orden de declaración de rutas: las rutas estáticas deben registrarse antes que las parametrizadas (`/:id`).

## Ejemplos rápidos (supertest / curl)
- Supertest (ya usado en `tests/endpointTest.test.ts`):

```ts
import request from 'supertest';
import { makeApp } from './src/server';

await request(makeApp())
  .post('/orders')
  .send({ domicilio: 'Calle Falsa 1234', pizzas: [{ size: 'M', toppings: ['a'] }] });
```

- cURL ejemplo:

```powershell
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"domicilio":"Calle Falsa 1234","pizzas":[{"size":"M","toppings":["a"]}]}'
```

(Para usar cURL primero agrega un `start` que haga `app.listen(3000)`).

---
Si querés, puedo:
- Añadir un `start`/`dev` script y el `src/index.ts` para ejecutar el servidor localmente.
- Completar tests faltantes para llevar cobertura de `services` y `controllers` por encima de 80%.
Dime cuál querés que haga y lo hago ahora.

## Matriz de tests

| ID | Descripción | Precondición | Input | Acción | Resultado esperado | Test file |
|----|-------------|--------------|-------|--------|--------------------|-----------|
| T1 | POST /orders crea orden válida | No hay órdenes (reset) | { domicilio: 'Caronti 572', pizzas:[{size:'M',toppings:['a','b']}] } | POST /orders | 201, body contiene `id` y `precio` > 0 | `tests/endpointTest.test.ts` |
| T2 | crearOrden valida max toppings | N/A | crearOrden(domicilio, pizzas con 6 toppings) | llamar `crearOrden` | Lanza error que menciona `toppings` | `tests/orderService.test.ts` |
| T3 | crearOrden calcula precio y crea orden | N/A | crearOrden(domicilio válido, pizzas con toppings) | llamar `crearOrden` | Devuelve orden con `precio` > 0 y domicilio trim() | `tests/orderService.test.ts` |
| T4 | crearOrden rechaza domicilio corto | N/A | crearOrden('short', pizzas) | llamar `crearOrden` | Lanza error que menciona `domicilio` | `tests/orderService.test.ts` |
| T5 | GET /orders inicial vacío | resetOrders usado | N/A | GET /orders | 200, body: [] | `tests/controllers.test.ts` |
| T6 | POST /orders -> GET /orders/:id -> POST /orders/:id/cancel | resetOrders usado | POST /orders (domicilio válido, pizzas) | Crear orden, luego GET por id, luego POST /:id/cancel | 201 en creación con `id`; GET devuelve ese id; cancel devuelve estado `cancelado` | `tests/controllers.test.ts` |
| T7 | GET /orders/order?estado=pendiente filtra por estado | resetOrders usado y hay al menos una orden pendiente | GET /orders/order?estado=pendiente | GET | 200, array de órdenes filtradas | `tests/controllers.test.ts` |

La matriz resume cada caso de test implementado actualmente, su entrada y el resultado esperado para facilitar la revisión y trazabilidad.
