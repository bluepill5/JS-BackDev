/* -------------------------------- Librerias ------------------------------- */
import dotenv from 'dotenv';
dotenv.config();

import * as http from 'http'; 
import {fileURLToPath} from 'url';
import path from 'path';

import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';

import auth from './middlewares/auth.middlewares.js';

import { engine } from 'express-handlebars';

import Product from './controllers/Product.js';

import router_cart from './routes/cart.routes.js';
import router_products from './routes/product.routes.js';
import ProductTestRouter from './routes/product-test.routes.js';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js'

import passport from './utils/passport.utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------------------------------------------------------------- */
/*                              Servidor Express                              */
/* -------------------------------------------------------------------------- */
const app = express();
app.use(cookieParser());
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
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        options: {
            userNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000 },
    rolling: true
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
 });

app.use(passport.initialize());
app.use(passport.session());


let products = new Product();
/* ------------------------------- Websockets ------------------------------- */
const server = http.createServer(app);
import { Server } from 'socket.io';

const io = new Server(server);

let today = new Date();
let time = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const messages = [
    {
        email: "bluepill5",
        datemessage: time,
        text: "Hola!!! en que podemos ayudarte???",
    },
];

io.on("connection", (socket) => {
  // Enviamos todos los mensajes al cliente cuando se conecta
  io.sockets.emit("messageBack", messages);
  products.getAll().then((prods) => {
      io.sockets.emit("messageBackProds", prods);
  });

  // Recibimos los mensajes desde el frontend
  // Chat
  socket.on("messageFront", (data) => {
    messages.push(data);
    io.sockets.emit("messageBack", messages);
  });

  // Products
  socket.on("messageFrontProds", (data) => {
    products.save(data);
    products.getAll().then((prods) => {
        io.sockets.emit("messageBackProds", prods);
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                                  Endpoints                                 */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- Home ---------------------------------- */
app.get('/', (req, res) => {
    products.getAll().then((prods) => {
        res.render('index', {
            prods,
            exist_product: prods.length > 0
        });
    });
});

app.get('/formulario', (req, res) => {
    products.getAll().then((prods) => {
        res.render('form', {
            prods,
            // exist_product: prods.length > 0
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
app.use('/productos-test', new ProductTestRouter());
// app.use('/', new UserRouter());
app.use('/', AuthRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`🔥 Servidor escuchando con Express en puerto http://localhost:8080`);
});

