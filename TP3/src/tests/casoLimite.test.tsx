import { render, screen } from '@testing-library/react';
import App from '../App';

import { server } from '../mocks/server';
import { rest } from 'msw';

test('muestra error al cargar menu', async () => {
  server.use(rest.get('/api/menu', (req, res, ctx) => res(ctx.status(500))));
  render(<App />);
  await screen.findByText(/Error al cargar menú/i);
});
