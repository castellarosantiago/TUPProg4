import React from 'react';
import { useOrder } from '../context/ordenContext'; 
import type { OrdenEstado } from '../types/ordenItem';
import { useState } from 'react';

// Función de utilidad para calcular el total
const calculateTotal = (order:OrdenEstado):number => {
    const total = order.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    return total;
}

const Orden: React.FC = () => {
    const { order, removeFromOrder, sendOrder } = useOrder();
    const [message, setMessage] = useState<string | null>(null); 
    const total = calculateTotal(order);

    const handleSendOrder = async () => {
        setMessage(null);
        try {
            await sendOrder();
            setMessage("Pedido confirmado");
        } catch (err) {
            setMessage("Error al enviar el pedido");
        }
    };

    return (
        <div role="region" aria-labelledby="order-summary-heading">
            <h2 id="order-summary-heading">Resumen del Pedido</h2>
            <ul aria-label="Pedido actual">
                {order.map((item) => (
                    <li key={item.id}>
                        {item.nombre} x {item.cantidad}
                        <button onClick={() => removeFromOrder(item.id)}>
                            Eliminar {item.nombre}
                        </button>
                    </li>
                ))}
            </ul>
            
            <p>
                Total: **${total.toFixed(2)}**
            </p>

            <button onClick={handleSendOrder} disabled={order.length === 0}>
                Enviar Pedido
            </button>

            {message && <p aria-live="assertive">{message}</p>}
        </div>
    );
};

export default Orden;
