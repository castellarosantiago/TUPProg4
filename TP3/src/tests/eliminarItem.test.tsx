import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('eliminar item del pedido', async () => {
  render(<App />);
  await screen.findByText('Café');
  const add = screen.getAllByRole('button', { name: /agregar/i })[0];
  await userEvent.click(add);
  const remove = screen.getByRole('button', { name: /eliminar/i });
  await userEvent.click(remove);
  expect(screen.queryByText('Café')).not.toBeInTheDocument();
});
