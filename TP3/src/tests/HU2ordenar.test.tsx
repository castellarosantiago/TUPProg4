// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';

// test('Agregar productos a la orden', async () => {
//   render(<App />);

//   await screen.findByText('Café');
//   const addButtons = screen.getAllByRole('button', { name: /agregar/i });
//   await userEvent.click(addButtons[0]);
//   expect(screen.getByRole('list', { name: /pedido/i })).toBeInTheDocument();
//   expect(screen.getByText('Café')).toBeInTheDocument(); 
// });



import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'; 
import App from '../App';

//AHORA DEBE FALLAR
test('HU2 - Agregar productos al pedido', async () => {
  const CAFE_MOCK = { id: '1', nombre: 'Café', precio: 150 };
  const mockAddToOrder = vi.fn(); 
  
  render(<App />); 

  const cafeItem = await screen.findByText(/Café/i); 
  await user.click(cafeItem); 
  expect(mockAddToOrder).toHaveBeenCalledTimes(1); // Verificar que el mock fue llamado
  expect(mockAddToOrder).toHaveBeenCalledWith(CAFE_MOCK); 
});