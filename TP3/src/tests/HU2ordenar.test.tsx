import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'; 

test('HU2 - Agregar productos a la orden: El ítem debe aparecer en el resumen del pedido', async () => {
    render(<App />);
    
    const cafeItemMenu = await screen.findByText(/Café/i); 

    await userEvent.click(cafeItemMenu);
    
    expect(screen.getByText(/Café x 1/i)).toBeInTheDocument(); 

    const totalElement = screen.getByText(/Total:/i);
    expect(totalElement).toHaveTextContent('$150.00'); 
});