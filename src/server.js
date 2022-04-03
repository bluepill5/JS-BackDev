/* -------------------------------- Librerias ------------------------------- */
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const http = require('http');
const { engine } = require('express-handlebars');
const Product = require('./controllers/Product');
const Cart = require('./controllers/Cart');

const {get_products, get_product, post_product, update_product, delete_product} = require('./controllers/ProductFunctions');

const router_cart = require('./routes/cart.routes');
const router_products = require('./routes/product.routes');
let path_file = './productos.json';

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
const { Server } = require('socket.io');

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

const products_stream = JSON.parse(fs.readFileSync(path_file));;

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
/* ---------------------------------- Home ---------------------------------- */
app.get('/', (req, res) => {
    let products = get_products(path_file);
    products.then((prods) => {
        res.render('index', {
            prods,
            exist_product: prods.length > 0
        });
    });
});

app.get('/formulario', (req, res) => {
    let products = get_products(path_file);
    products.then((prods) => {
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

const PORT = 8080;
server.listen(PORT, () => {
console.log(`🔥 Servidor escuchando con Express en puerto http://localhost:8080`);
});
