// src/context/OrderContextTypes.ts

import type { Producto } from '../schemas/producto';
import type { OrdenItem } from "./ordenItem"; 

export interface OrderContextType {
    // 1. Estado: La lista de ítems en el pedido
    order: OrdenItem[]; 

    // 2. Acción: La función para agregar un producto
    addToOrder: (product: Producto) => void;
}