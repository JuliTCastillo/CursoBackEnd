import express from "express";
import productoRouter from "./routes/producto.route.js";
import __dirname from "./utils.js";

const app = express();
const server = app.listen(8080, ()=>console.log("Escuchando :)"));

app.use(express.json()); //le indicamos que procese json
app.use(express.static(__dirname + "/public"));//Le indicamos que vamos a trabajar con un sistema estatico
//Conectamos nuestro programa principal con el router
app.use("/api/products", productoRouter);

//El USE es un MIDDLEWARE: Es decir que para en todos sus use para realizar el pedido que se esta pidiendo. Podemos crear nuestros MIDDLEWARE | un parametro importante es el next: Su funcionamiento es pasar al siguiente MIDDLEWARE.