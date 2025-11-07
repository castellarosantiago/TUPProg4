import type { Producto } from '../schemas/producto';

export interface OrdenItem extends Producto {
    cantidad:number;
}

export type OrdenEstado = OrdenItem[];