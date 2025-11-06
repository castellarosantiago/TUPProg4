import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('muestra total actualizado', async () => {
  render(<App />);
  await screen.findByText('Café');
  const add = screen.getAllByRole('button', { name: /agregar/i })[0];
  await userEvent.click(add);
  await userEvent.click(add); 
  expect(screen.getByText(/Total: \$\d+/i)).toHaveTextContent('Total: $300');
});
