import express from "express";
import productRouter from './routes/product.router.js';
import carritoRouter from './routes/carrito.route.js';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from "./utils.js";
import {Server} from 'socket.io'; //?importamos el modulo de socket
import cookieParser from "cookie-parser";
import { addLogger } from "./utils.js";
const app = express();

// const object = objectChat;

//Le indicamos donde van estar guardadas nuestras vistas
app.set('views', `${__dirname}/public/views`); //templay string
app.set('view engine', 'ejs');

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

app.get('*', (req, res)=>{
    req.logger.warn(`Se inteto ingresar a ${req.url} que no existe`);
    res.render('pages/problems', {problem: 'Esta pagina no es disponible :(', error: '404'});
})

//El USE es un MIDDLEWARE: Es decir que para en todos sus use para realizar el pedido que se esta pidiendo. Podemos crear nuestros MIDDLEWARE | un parametro importante es el next: Su funcionamiento es pasar al siguiente MIDDLEWARE.
const PORT = process.env.PORT || 8080; //?En el caso que tengamos un puerto lo tomamos, sino tenemos un puerto por defecto tomamos el 8080 | en glitch usa puertos distinto a 8080
const server = app.listen(PORT, ()=>console.log("Escuchando :)"));

//? iniciamos el socket indicando el puerto que usamos
const io = new Server(server);
//const message = []; //guarda los mensaje se envian

//?el metodo .on se queda escuchando los evento del servidor 
io.on('connection', async socket =>{
    /*************
     * los emit y on, es la comunicacion que hay entre el usuario y el servidor
     * ? Van acompañado de el nombre de la accion y una variable que guarda el dato de la accion
     *************/
    // socket.on('message', async(data) =>{
    //     // message.push(data);
    //     await object.save(data);
    //     let messages = await object.getAll();
    //     io.emit('logs', messages);
    // })
    socket.on('authenticated', data =>{
        //socket :  hablamos de una accion realizado por el usuario que tenemos
        //.broadcast : realiza una accion para los otros usaurio menos al usuario que desencadeno el evento
        socket.broadcast.emit('newUserConnected', data);
    })
    socket.on('product', data=>{
    })
    socket.on('newProduct', data => io.emit('addProduct'))
})
