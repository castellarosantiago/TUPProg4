// src/context/OrderContextTypes.ts

import type { Producto } from '../schemas/producto';
import type { OrdenItem } from "./ordenItem"; 

export interface OrderContextType {
    order: OrdenItem[]; 
    addToOrder: (product: Producto) => void;
    removeFromOrder: (productId: string) => void;
}