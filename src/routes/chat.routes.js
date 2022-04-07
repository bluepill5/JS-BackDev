const http = require('http');
const { Server } = require('socket.io');

let path_file = './src/database/productos.json';

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







