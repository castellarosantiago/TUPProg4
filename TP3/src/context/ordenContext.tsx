// src/context/OrderContext.tsx

import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { OrdenItem } from '../types/ordenItem';
import type { OrdenEstado } from '../types/ordenItem';
import type { Producto } from '../schemas/producto';
import type { OrderContextType } from '../types/orderContextTypes'; // Asumiendo que definiste la interfaz aparte

// 1. Crear el contexto
// Usamos un valor por defecto que cumpla con OrderContextType
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// 2. Crear el hook de uso
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder debe ser usado dentro de un OrderProvider');
    }
    return context;
};

// 3. Crear el componente Provider
interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [order, setOrder] = useState<OrdenEstado>([]);
    
    const addToOrder = (product: Producto) => {
        setOrder(prevOrder => {
            const existingItem = prevOrder.find(item => item.id === product.id);

            if (existingItem) {
                // Actualización inmutable: crea un nuevo array con la cantidad incrementada
                return prevOrder.map(item => {
                    if (item.id === product.id) {
                        return { ...item, cantidad: item.cantidad + 1 };
                    }
                    return item;
                });
            } else {
                // Añadir el nuevo ítem con cantidad 1
                const newItem: OrdenItem = { ...product, cantidad: 1 };
                return [...prevOrder, newItem];
            }
        });
    };
    
    const contextValue: OrderContextType = { order, addToOrder };

    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    );
};