import express from "express";
import {orderRoutes} from "../routes"

export function crearApp(){
    const app = express();
    app.use(express.json());
    app.use("/orders", orderRoutes);
    return app;
}