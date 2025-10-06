import request from "supertest";
import { describe, it, expect, beforeEach } from 'vitest';
import { makeApp } from "../src/server";
import { resetOrders } from "../src/services/orderService";

beforeEach(()=> resetOrders());

describe("POST /orders (integracion)", ()=>{
    it("crea una orden válida y responde 201 con id", async () =>{
        const res = await request(makeApp())
        .post("/orders")
        .send({domicilio:"Caronti 572", pizzas: [{size: "M", toppings: ["a", "b"]}]});
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.precio).toBeGreaterThan(0);
    })
})