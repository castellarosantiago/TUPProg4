import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Agregar productos a la orden', async () => {
  render(<App />);

  await screen.findByText('Café');
  const addButtons = screen.getAllByRole('button', { name: /agregar/i });
  await userEvent.click(addButtons[0]);
  expect(screen.getByRole('list', { name: /pedido/i })).toBeInTheDocument();
  expect(screen.getByText('Café')).toBeInTheDocument(); 
});
