import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
//import { server } from '../mocks/server';
//import { rest } from 'msw';

// HU1 - 
test('Mostrar el menu con los productos mockeados', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText('Café')).toBeInTheDocument());
  expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
});
