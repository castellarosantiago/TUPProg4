import { render, screen, waitFor } from '@testing-library/react';
import Menu from '../components/menu';
import { OrderProvider } from '../context/ordenContext';

test('HU1 - Mostrar el menu con los productos mockeados', async () => {
  render(
    <OrderProvider>
      <Menu />
    </OrderProvider>
  );
    const cafeItem = await screen.findByText(/Café/i); 
    
    expect(cafeItem).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
});