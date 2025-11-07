import React from 'react';
import { useOrder } from '../context/ordenContext'; // Asegúrate de la ruta correcta
import type { OrdenEstado } from '../types/ordenItem';

// Función de utilidad para calcular el total
const calculateTotal = (order:OrdenEstado):number => {
    // Usa reduce para sumar (precio * cantidad) de cada item
    const total = order.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    return total;
}

const Orden: React.FC = () => {
    // 1. Obtener el estado 'order' del contexto
    const { order } = useOrder(); 
    
    // 2. Calcular el total
    const total = calculateTotal(order);

    return (
        <div role="region" aria-labelledby="order-summary-heading">
            <h2 id="order-summary-heading">Resumen del Pedido</h2>
            
            {/* Implementación para listar ítems */}
            <ul aria-label="Pedido actual">
                {order.map((item) => (
                    <li key={item.id}>
                        {/* Renderizar nombre y cantidad para pasar el test /Café x 1/i */}
                        {item.nombre} x {item.cantidad}
                    </li>
                ))}
            </ul>
            
            <p>
                Total: **${total.toFixed(2)}**
            </p>
        </div>
    );
};

export default Orden;
