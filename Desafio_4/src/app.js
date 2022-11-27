import express from "express";
import productoRouter from "./routes/producto.route.js";
import Contenedor from "./managers/contenedor.js";
import __dirname from "./utils.js";

const object = new Contenedor ();
const app = express();

//Le indicamos donde van estar guardadas nuestras vistas
app.set('views', `${__dirname}/public/views`); //templay string
app.set('view engine', 'ejs');

app.use(express.json()); //le indicamos que procese json
app.use(express.urlencoded({ extended : true }));
app.use(express.static(__dirname + "/public"));//Le indicamos que vamos a trabajar con un sistema estatico

//Conectamos nuestro programa principal con el router
app.use("/api/products", productoRouter);


const server = app.listen(8080, ()=>console.log("Escuchando :)"));
//El USE es un MIDDLEWARE: Es decir que para en todos sus use para realizar el pedido que se esta pidiendo. Podemos crear nuestros MIDDLEWARE | un parametro importante es el next: Su funcionamiento es pasar al siguiente MIDDLEWARE.
