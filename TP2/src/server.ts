import express from 'express';
import orderRoutes from './routes/orderRoutes'

export function makeApp(){
    const app = express();
    app.use(express.json());
    app.use('/orders', orderRoutes);
    app.get(("/", (_, res)=> res.json({ok:true})));
    return app;
}