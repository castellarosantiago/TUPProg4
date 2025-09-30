import {crearApp} from "./app/app";
const app = crearApp();
app.listen(3000, ()=>console.log("Servidor corriendo en puerto 3000"));