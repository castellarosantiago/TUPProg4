import { makeApp } from "../server";

const app = makeApp();
const port = process.env.PORT ?? 3000;
app.listen(port, ()=> console.log(`servidor escuchando en el puerto ${port}`));
