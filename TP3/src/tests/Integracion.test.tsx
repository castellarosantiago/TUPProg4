import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'; 

test('FLUJO COMPLETO: Cargar Menú -> Agregar Ítems -> Calcular Total -> Enviar Pedido -> Vaciar Carrito', async () => {
    render(<App />);
    const user = userEvent.setup();

    const cafeItemMenu = await screen.findByText(/Café/i);
    expect(cafeItemMenu).toBeInTheDocument();
    
    // Clic en Café ($150)
    await user.click(cafeItemMenu);
    
    // Clic en Té ($120)
    const teItemMenu = screen.getByText(/Te/i);
    await user.click(teItemMenu);
    
    const totalElement = screen.getByText(/Total:/i);
    expect(totalElement).toHaveTextContent('$270.00');
    expect(screen.getByText(/Café x 1/i)).toBeInTheDocument();

    // Simular el clic en el botón de envío
    const sendButton = screen.getByRole('button', { name: /Enviar Pedido/i });
    await user.click(sendButton);

    await waitFor(() => {
        expect(screen.getByText(/Pedido confirmado/i)).toBeInTheDocument();
    });
    
    // El total debe volver a 0.00 después del éxito del envío (lógica clearOrder)
    const emptyTotalElement = screen.getByText(/Total:/i);
    expect(emptyTotalElement).toHaveTextContent('$0.00'); 
    
    // Verificar que la lista de ítems está vacía (opcional, pero buena práctica)
    expect(screen.queryByText(/Café x 1/i)).not.toBeInTheDocument();
});