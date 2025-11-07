import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

test('HU1 - Mostrar el menu con los productos mockeados', async () => {
  render(
    <App />
  );
    const cafeItem = await screen.findByText(/Café/i); 
    
    expect(cafeItem).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
});