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

let playersReadyCount = 0;

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('ready', () => {
        console.log(`Player ${socket.id} is Ready`);
        playersReadyCount++;

        if(playersReadyCount % 2 === 0) {
            io.emit('startGame', socket.id);
        }
    });

    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
        socket.broadcast.emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
        console.log(`Client ${socket.id} disconnected: ${reason}`);
    });
});