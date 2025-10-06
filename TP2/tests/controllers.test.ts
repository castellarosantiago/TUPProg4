import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import { makeApp } from '../src/server';
import { resetOrders } from '../src/services/orderService';

beforeEach(()=> resetOrders());

describe('controllers integration', ()=>{
    it('GET /orders returns empty array initially', async ()=>{
        const res = await request(makeApp()).get('/orders');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });

    it('POST /orders then GET /orders/:id and cancel', async ()=>{
        const app = makeApp();
        const createRes = await request(app).post('/orders')
            .send({domicilio:'Calle Falsa 1234', pizzas:[{size:'M', toppings:['a']} ]});
        expect(createRes.status).toBe(201);
        expect(createRes.body).toHaveProperty('id');
        const id = createRes.body.id;

        const getRes = await request(app).get(`/orders/${id}`);
        expect(getRes.status).toBe(200);
        expect(getRes.body.id).toBe(id);

        const cancelRes = await request(app).post(`/orders/${id}/cancel`);
        expect(cancelRes.status).toBe(200);
        expect(cancelRes.body.estado).toBe('cancelado');
    });

    it('GET /orders/order?estado=pendiente returns array', async ()=>{
        const app = makeApp();
        await request(app).post('/orders')
            .send({domicilio:'Calle Falsa 1234', pizzas:[{size:'M', toppings:['a']} ]});
        const res = await request(app).get('/orders/order').query({estado:'pendiente'});
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
