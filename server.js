const http = require('http');

const PORT = 3000;
const server = http.createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});

io.on('connection', (socket) => {
    console.log("A user conected");
});