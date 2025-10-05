// import {Request, Response} from 'express';
// import * as orderService from '../services/orderService';

// export const list = async (req: Request, res: Response)=>{
//     const orders = await orderService.findAll();
//     res.json(orders);
// }

// export const get = async(req: Request, res: Response)=>{
//     const order = await orderService.findById(req.params.id);
//     if(!order) return res.status(404).json({message: 'Not found'});
//     res.json(order);
// }

// export const create = async(req: Request, res: Response)=>{
//     const created = await orderService.create(req.body);
//     res.status(201).json(created);
// }

// export const update = async(req: Request, res: Response)=>{
//     const updated = await orderService.update(req.params.id, req.body);
//     res.json(updated)
// } 

// export const remove = async(req: Request, res: Response)=>{
//     await orderService.remove(req.params.id);
//     res.status(204).end();
// }

import { Request, Response } from 'express';
import * as service from "../services/orderService";
import { orderSchema } from '../middlewares/orderSchema';

export async function list(req: Request, res: Response){
    const status = req.query.status as string | undefined;
    const list = service.getOrdenes(status as any);
    res.json(list);
}

export async function get(req: Request, res: Response){
    try{
        const o = service.getOrden(req.params.id);
        res.json(o);
    }catch(err:any){
        res.status(err.status || 500).json({error: err.message});
    }
}

export async function getStatus(req: Request, res: Response){
    try{
        const o = service.getEstado(req.params.estado);
        res.json(o);
    }catch(err:any){
        res.status(err.status || 500).json({error: err.message});
    }
} 

export async function create(req: Request, res: Response){
    const parsed = orderSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(422).json({error: parsed.error});
    }
    try{
        const created = service.crearOrden(parsed.data.domicilio, parsed.data.pizzas);
        res.status(201).json(created);
    }catch(err:any){
        res.status(err.status || 500).json({error:err.message});
    }
}

//stubs para rutas

export async function update(req: Request, res: Response){
    res.status(501).json({error: "no implementado"});
}

export async function remove(req: Request, res: Response){
    res.status(501).json({error: "no implementado"});
}