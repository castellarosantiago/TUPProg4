// import express from "express";
// import helmet from 'helmet';
// import routes from './routes';

// const app = express();
// app.use(helmet());
// app.use(express.json());

// app.use('/api', routes);

// //middleware para devolver 404
// app.use((req, res)=>res.status(404).json({message:'Not found'}));

// export default app;

import { makeApp } from "../server";

const app = makeApp();
const port = process.env.PORT ?? 3000;
app.listen(port, ()=> console.log(`servidor escuchando en puerto ${port}`))