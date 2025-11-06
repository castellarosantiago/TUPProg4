import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  nombre: z.string().min(2),
  precio: z.number().positive()
});

export type Producto = z.infer<typeof ProductSchema>;
