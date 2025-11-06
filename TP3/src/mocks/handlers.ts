import { rest } from 'msw';
// PARA TESTS

const menu = [
  { id: '1', nombre: 'Café', precio: 150 },
  { id: '2', nombre: 'Te', precio: 120 },
  { id: '3', nombre: 'Medialuna', precio: 80 }
];

export const handlers = [
  rest.get('http://localhost/api/menu', (req, res, ctx) => res(ctx.status(200), ctx.json(menu))),
  rest.post('/api/ordenes', (req, res, ctx) => res(ctx.status(201), ctx.json({ message: 'Pedido confirmado' })))
];
