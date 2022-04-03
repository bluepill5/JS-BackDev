/* -------------------------------- Librerias ------------------------------- */
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const http = require('http');
const { engine } = require('express-handlebars');
const Product = require('./controllers/Product');
const Cart = require('./controllers/Cart');


/* -------------------------------- Productos ------------------------------- */
let path_file = './productos.json';
async function get_products(path_file) {
    const container = new Product(path_file);
    let prods = await container.getAll();
    return prods;
}

async function get_product(path_file, id) {
    const container = new Product(path_file);
    let prod = await container.getById(id);
    return prod;
}

async function post_product(path_file, newProduct) {
    const container = new Product(path_file);
    let new_prod_id = await container.save(newProduct);
    return new_prod_id;
}

async function update_product(path_file, id, prodUpdate) {
    const container = new Product(path_file);
    let prod = await container.updateById(id, prodUpdate);
    return prod;
}

async function delete_product(path_file, id) {
    const container = new Product(path_file);
    let prod = await container.deleteById(id);
    return prod;
}

/* -------------------------------------------------------------------------- */
/*                    Servidor Express & Websockets                           */
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
    // io.sockets.emit("message", data);
    io.sockets.emit("messageBack", messages);
  });

  // Products
  socket.on("messageFrontProds", (data) => {
    post_product(path_file, data);
    products_stream.push(data);
    // let products = get_products(path_file);
    // products.then((prods) => {
    //     io.sockets.emit("messageBackProds", prods);
    // });
    io.sockets.emit("messageBackProds", products_stream);
  });
});


/* --------------------------------- Routers -------------------------------- */
const router_products = express.Router();
const router_cart = express.Router();

/* -------------------------------- Endpoints ------------------------------- */
/* ---------------------------------- Home ---------------------------------- */
app.get('/', (req, res) => {
    let products = get_products(path_file);
    products.then((prods) => {
        res.render('index', {
            prods,
            exist_product: prods.length > 0
        });
    });
    //res.render('index', {});
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

/* -------------------------------- Productos ------------------------------- */

router_products.get('/', (req, res) => {
    let products = get_products(path_file);
    products.then((prods) => {
        res.render('products', {
            prods,
            exist_product: prods.length > 0
        });
    });
});

router_products.get('/:id', (req, res) => {
    let id = req.params.id;

    let product = get_product(path_file, id);

    product.then((data) => {
        res.render('product', {
            prod: data,
        });
    });

});

router_products.post('/', (req, res) => {
    const { body } = req;
    let new_prod_id = post_product(path_file, body);
    new_prod_id.then((id) => {
        res.send('<script>alert("Información guardada");window.location.href="/formulario";</script>');
    });
});

/* --------------------------------- Carrito -------------------------------- */
router_cart.get('/agregar/:id', (req, res) => {
    let id = req.params.id;
    let product = get_product(path_file, id);

    const cart = new Cart(req.session.cart ? req.session.cart : {});
    product.then((prod) => {
        cart.add(prod, id);
    
        req.session.cart = cart;
        console.log(cart);
    
        res.redirect('/');
    });

});

router_cart.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(id);
    req.session.cart = cart;
    res.redirect('/carrito');
});


router_cart.get('/', (req, res) => {
    if (!req.session.cart) {
        return res.render('cart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    return res.render('cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty
    });
});


/* ---------------------------------- Chat ---------------------------------- */
app.get('/chat', (req, res) => {
    res.render('chat', {});
});

/* -------------------------- Inicializar Servidor -------------------------- */
// Routers
app.use('/productos', router_products);
app.use('/carrito', router_cart);

const PORT = 8083;
server.listen(PORT, () => {
console.log(`🔥 Servidor escuchando con Express en puerto http://localhost:8083`);
});
