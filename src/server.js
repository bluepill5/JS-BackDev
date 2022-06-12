/* -------------------------------- Librerias ------------------------------- */
import dotenv from "dotenv";
dotenv.config();

/* --------------------------------- log4js --------------------------------- */
import log4js from 'log4js';

log4js.configure({
  appenders: {
    console: { type: 'console' },
    error: { type: 'file', filename: 'error.log'},
    loggerConsole: { type: 'logLeveFilter', appender: 'console', level: 'trace' },
    loggerFile: { type: 'logLeveFilter', appender: 'error', level: 'error' },
  },
  categories: {
    default: { appenders: ['loggerConsole'], level: 'all' },
    custom: { appenders: ['loggerConsole', 'loggerFile'], level: 'all' }
  }
});

log4js.configure({
  appenders: {
    myConsole: { type: 'console'},
    myLoggerFile1: { type: 'file', filename: 'file1.log' },
    myLoggerFile2: { type: 'file',  filename: 'file2.log' }
  },
  categories: {
    default: {
      appenders: ['myConsole'], 
      level: 'trace'
    },
    consola: {
      appenders: ['myConsole'], 
      level: 'debug',
    },
    file1: {
      appenders: ['myLoggerFile1'], 
      level: 'error',
    },
    file2: {
      appenders: ['myLoggerFile2'], 
      level: 'fatal',
    },
    mix: {
      appenders: ['myConsole', 'myLoggerFile2'], 
      level: 'fatal',
    },
  }
});

let loggerDefault = log4js.getLogger();
let loggerConsole = log4js.getLogger('consola');
let loggerFile1 = log4js.getLogger('file1');
let loggerFile2 = log4js.getLogger('file2');
let loggerMix = log4js.getLogger('mix');

console.log('DEFAULT');
loggerDefault.trace('Trace');
loggerDefault.debug('Debug');
loggerDefault.info('Info');
loggerDefault.warn('Warn');
loggerDefault.error('Error');
loggerDefault.fatal('Fatal');
console.log('CONSOLE');
loggerConsole.trace('Trace');
loggerConsole.debug('Debug');
loggerConsole.info('Info');
loggerConsole.warn('Warn');
loggerConsole.error('Error');
loggerConsole.fatal('Fatal');
console.log('File1');
loggerFile1.trace('Trace');
loggerFile1.debug('Debug');
loggerFile1.info('Info');
loggerFile1.warn('Warn');
loggerFile1.error('Error');
loggerFile1.fatal('Fatal');
console.log('File2');
loggerFile2.trace('Trace');
loggerFile2.debug('Debug');
loggerFile2.info('Info');
loggerFile2.warn('Warn');
loggerFile2.error('Error');
loggerFile2.fatal('Fatal');
console.log('MIX');
loggerMix.trace('Trace');
loggerMix.debug('Debug');
loggerMix.info('Info');
loggerMix.warn('Warn');
loggerMix.error('Error');
loggerMix.fatal('Fatal');

import * as http from "http";
import { fileURLToPath } from "url";
import path from "path";

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo";

// import auth from './middlewares/auth.middlewares.js';

import { engine } from "express-handlebars";

import Product from "./controllers/Product.js";

import router_cart from "./routes/cart.routes.js";
import router_products from "./routes/product.routes.js";
import ProductTestRouter from "./routes/product-test.routes.js";
// import UserRouter from './routes/user.routes.js';
import AuthRouter from "./routes/auth.routes.js";
import InfoRouter from "./routes/info.routes.js";
import ForkRouter from "./routes/fork.routes.js";

import passport from "./utils/passport.utils.js";

import minimist from "minimist";
import cluster from "cluster";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const numCPUs = os.cpus().length;

/* -------------------------------------------------------------------------- */
/*                              Servidor Express                              */
/* -------------------------------------------------------------------------- */
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "hbs");

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
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000 },
    rolling: true,
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(passport.initialize());
app.use(passport.session());

let products = new Product();
/* ------------------------------- Websockets ------------------------------- */
const server = http.createServer(app);
import { Server } from "socket.io";

const io = new Server(server);

let today = new Date();
let time =
  today.getDate() +
  "/" +
  (today.getMonth() + 1) +
  "/" +
  today.getFullYear() +
  " " +
  today.getHours() +
  ":" +
  today.getMinutes() +
  ":" +
  today.getSeconds();

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
app.get("/", (req, res) => {
  products.getAll().then((prods) => {
    res.render("index", {
      prods,
      exist_product: prods.length > 0,
    });
  });
});

app.get("/formulario", (req, res) => {
  products.getAll().then((prods) => {
    res.render("form", {
      prods,
      // exist_product: prods.length > 0
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                                    Chat                                    */
/* -------------------------------------------------------------------------- */
app.get("/chat", (req, res) => {
  res.render("chat", {});
});

/* -------------------------------- Opciones -------------------------------- */
const options = {
  alias: {
    m: "mode",
    p: "port",
  },
  default: {
    mode: "fork",
    port: 8081,
  },
};

/* -------------------------- Inicializar Servidor -------------------------- */
// Routers
app.use("/productos", router_products);
app.use("/carrito", router_cart);
app.use("/productos-test", new ProductTestRouter());
// app.use('/', new UserRouter());
app.use("/", AuthRouter);
app.use("/", InfoRouter);
app.use("/", ForkRouter);

const { mode, port } = minimist(process.argv.slice(2), options);
// const PORT = process.argv[2] || process.env.PORT || 3000;

if (mode === 'cluster') {
  console.log(`Mode: ${mode}`);
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    server.listen(port, () => {
        console.log(
          `🔥 Servidor escuchando con Express en puerto http://localhost:${port}`
        );
      });
  }
} else {
  console.log(`Mode: ${mode}`);
  server.listen(port, () => {
    console.log(
      `🔥 Servidor escuchando con Express en puerto http://localhost:${port}`
    );
  });
}


