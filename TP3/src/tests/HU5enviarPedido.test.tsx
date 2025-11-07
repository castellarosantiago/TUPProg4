import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../App'; 

test('HU5: El envío de la orden debe mostrar confirmación y vaciar el carrito', async () => {
    render(<App />);
    
    // Cargar el carrito con un ítem (Café, $150)
    const cafeItemMenu = await screen.findByText(/Café/i);
    await user.click(cafeItemMenu);
    
    // Verificar que el total es $150.00 antes del envío
    const initialTotalElement = screen.getByText(/Total:/i);
    expect(initialTotalElement).toHaveTextContent('$150.00');

    // Simular el clic en el botón de envío
    // ⚠️ Esto fallará (ROJO) porque el botón "Enviar Pedido" no existe.
    const sendButton = screen.getByRole('button', { name: /Enviar Pedido/i });
    await user.click(sendButton);
    
    // Verificar el mensaje de éxito
    // ⚠️ Esto fallará (ROJO) porque la lógica de envío no está implementada.
    await waitFor(() => {
        expect(screen.getByText(/Pedido confirmado/i)).toBeInTheDocument();
    });

    // 5. Verificar que el carrito está vacío (total vuelve a $0.00)
    const emptyTotalElement = screen.getByText(/Total:/i);
    expect(emptyTotalElement).toHaveTextContent('$0.00'); 
});