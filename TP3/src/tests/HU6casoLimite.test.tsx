import { render, screen } from '@testing-library/react';
import { server } from '../mocks/server'; 
import { rest } from 'msw'; 
import App from '../App';

test('HU6: Mostrar "No hay productos disponibles" cuando el menú está vacío', async () => {
    // Simular lista vacía: Anular el handler por defecto usando server.use()
    server.use(
        rest.get('http://localhost/api/menu', (req, res, ctx) => {
            // Devolver un array vacío
            return res(ctx.status(200), ctx.json([]));
        })
    );
    
    render(<App />);

    const emptyMessage = await screen.findByText('No hay productos disponibles');
    
    expect(emptyMessage).toBeInTheDocument();
});