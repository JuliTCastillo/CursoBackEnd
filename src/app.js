import express from "express";
import productRouter from './routes/product.router.js';
import carritoRouter from './routes/carrito.route.js';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from "./utils.js";
import {Server} from 'socket.io'; //?importamos el modulo de socket
import cookieParser from "cookie-parser";
import { addLogger } from "./utils.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express";

const app = express();
const PORT = process.env.PORT || 8080; //?En el caso que tengamos un puerto lo tomamos, sino tenemos un puerto por defecto tomamos el 8080 | en glitch usa puertos distinto a 8080

//Le indicamos donde van estar guardadas nuestras vistas
app.set('views', `${__dirname}/public/views`); //templay string
app.set('view engine', 'ejs');

const swaggerOptions = {
    definition : {
        opneapi: "3.0.1",
        info: {
            title: "Libreria de Juli",
            description: "API privada de libreria"
        }
    },
    apis :[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions);


app.use(express.json()); //le indicamos que procese json
app.use(express.urlencoded({ extended : true }));
app.use(express.static(__dirname + "/public"));//Le indicamos que vamos a trabajar con un sistema estatico
app.use(cookieParser());
app.use(addLogger);

//Conectamos nuestro programa principal con el router
app.use('/', viewsRouter);
app.use("/api/products", productRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/user', userRouter);
app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

app.get('*', (req, res)=>{
    req.logger.warn(`Se inteto ingresar a ${req.url} que no existe`);
    res.render('pages/problems', {problem: 'Esta pagina no es disponible :(', error: '404'});
})

//El USE es un MIDDLEWARE: Es decir que para en todos sus use para realizar el pedido que se esta pidiendo. Podemos crear nuestros MIDDLEWARE | un parametro importante es el next: Su funcionamiento es pasar al siguiente MIDDLEWARE.

const server = app.listen(PORT, ()=>console.log("Escuchando :)"));

//? iniciamos el socket indicando el puerto que usamos
const io = new Server(server);

//?el metodo .on se queda escuchando los evento del servidor 
io.on('connection', async socket =>{
    socket.on('authenticated', data =>{
        //socket :  hablamos de una accion realizado por el usuario que tenemos
        //.broadcast : realiza una accion para los otros usaurio menos al usuario que desencadeno el evento
        socket.broadcast.emit('newUserConnected', data);
    })
    socket.on('product', data=>{
    })
    socket.on('newProduct', data => io.emit('addProduct'))
})
