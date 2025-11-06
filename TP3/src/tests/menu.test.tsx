import { render, screen, waitFor } from '@testing-library/react';
import Menu from '../components/menu';

// HU1 - Visualización inicial del menú
test('Mostrar el menu con los productos mockeados', async () => {
  render(<Menu />);
  await waitFor(() => expect(screen.getByText('Café')).toBeInTheDocument());
  expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
});


