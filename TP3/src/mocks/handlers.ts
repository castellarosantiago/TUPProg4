import { rest } from 'msw';
// PARA TESTS

const menu = [
  { id: '1', name: 'Café', price: 150 },
  { id: '2', name: 'Te', price: 120 },
  { id: '3', name: 'Medialuna', price: 80 }
];

export const handlers = [
  rest.get('/api/menu', (req, res, ctx) => res(ctx.status(200), ctx.json(menu))),
  rest.post('/api/orders', (req, res, ctx) => res(ctx.status(201), ctx.json({ message: 'Pedido confirmado' })))
];
