import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../App'; 

test('HU4: Eliminar ítem debe remover solo ese producto y actualizar el total', async () => {
    render(<App />); 
  
    const cafeItemMenu = await screen.findByText(/Café/i);
    const teItemMenu = await screen.findByText(/Te/i);
    await user.click(cafeItemMenu); // Total: $150.00
    await user.click(teItemMenu);   // Total: $270.00
    
    // Verificar que ambos ítems y el total $270.00 están en el resumen
    expect(screen.getByText(/Café x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Te x 1/i)).toBeInTheDocument();
    
    const initialTotalElement = screen.getByText(/Total:/i);
    expect(initialTotalElement).toHaveTextContent('$270.00');
    
    const removeCafeButton = screen.getByRole('button', { name: /Eliminar Café/i }); 
    await user.click(removeCafeButton);
    
    // Verificar que el Café desapareció y el Té permanece
    expect(screen.queryByText(/Café x 1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Te x 1/i)).toBeInTheDocument();
    
    // Verificar el nuevo total (Solo Té: $120.00)
    const finalTotalElement = screen.getByText(/Total:/i);
    expect(finalTotalElement).toHaveTextContent('$120.00'); 
});
