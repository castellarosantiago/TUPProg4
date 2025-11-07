import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../App';

test('HU3: El pedido debe mostrar el total inicial ($0.00)',  () => {
    render(<App />); 

    const totalElement = screen.getByText(/Total:/i); 

    expect(totalElement).toBeInTheDocument();
    expect(totalElement).toHaveTextContent(/\$0\.00/i);
    
    expect(totalElement).toBeInTheDocument();
});


test('HU3: Al hacer clic en un ítem, el resumen debe mostrar el ítem y el total', async () => {
    render(<App />); 
    
    const cafeItem = await screen.findByText(/Café/i);
    await user.click(cafeItem);

    expect(screen.getByText(/Café x 1/i)).toBeInTheDocument();     

    const totalElement = await screen.findByText(/Total:/i); 

    expect(totalElement).toHaveTextContent('$150.00'); //
});