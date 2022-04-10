/* -------------------------------- Librerias ------------------------------- */
import dotenv from 'dotenv';
dotenv.config();

import * as http from 'http'; 
import { readFileSync } from 'fs'
import {fileURLToPath} from 'url';
import path from 'path';

import express from 'express';
import session from 'express-session';

import { engine } from 'express-handlebars';

import Product from './controllers/Product.js';
import { get_products, get_product, post_product, update_product, delete_product } from './controllers/ProductFunctions.js';

import router_cart from './routes/cart.routes.js';
import router_products from './routes/product.routes.js';
let path_file = './src/database/productos.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------------------------------------------------------------- */
/*                              Servidor Express                              */
/* -------------------------------------------------------------------------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "index.hbs",
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views/partials",
    })
);

/* --------------------------------- Session -------------------------------- */
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
 });


/* ------------------------------- Websockets ------------------------------- */
const server = http.createServer(app);
import { Server } from 'socket.io';

const io = new Server(server);

let today = new Date();
let time = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const messages = [
    {
        email: "bluepill5",
        datemessage: time,
        text: "Hola!!! en que podemos ayudarte???",
    },
];

const products_stream = JSON.parse(readFileSync(path_file));;

io.on("connection", (socket) => {
  // Enviamos todos los mensajes al cliente cuando se conecta
  io.sockets.emit("messageBack", messages);
  io.sockets.emit("messageBackProds", products_stream);

  // Recibimos los mensajes desde el frontend
  // Chat
  socket.on("messageFront", (data) => {
    messages.push(data);
    io.sockets.emit("messageBack", messages);
  });

  // Products
  socket.on("messageFrontProds", (data) => {
    post_product(path_file, data);
    products_stream.push(data);
    io.sockets.emit("messageBackProds", products_stream);
  });
});

/* -------------------------------------------------------------------------- */
/*                                  Endpoints                                 */
/* -------------------------------------------------------------------------- */
let products = new Product();
/* ---------------------------------- Home ---------------------------------- */
app.get('/', (req, res) => {
    // let prods = await products.getAll();
    // let products = get_products();
    products.getAll().then((prods) => {
        res.render('index', {
            prods,
            exist_product: prods.length > 0
        });
    });
});

app.get('/formulario', (req, res) => {
    // let products = get_products();
    products.getAll().then((prods) => {
        res.render('form', {
            prods,
            exist_product: prods.length > 0
        });
    });
});

/* -------------------------------------------------------------------------- */
/*                                    Chat                                    */
/* -------------------------------------------------------------------------- */
app.get('/chat', (req, res) => {
    res.render('chat', {});
});

/* -------------------------- Inicializar Servidor -------------------------- */
// Routers
app.use('/productos', router_products);
app.use('/carrito', router_cart);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`🔥 Servidor escuchando con Express en puerto http://localhost:8080`);
});