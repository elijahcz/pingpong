let playersReadyCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    
    pongNamespace.on('connection', (socket) => {
        let roomName;
        console.log(`User ${socket.id} connected`);

        socket.on('ready', () => {
            roomName = 'room' + Math.floor(playersReadyCount / 2);
            socket.join(roomName);

            console.log(`Player ${socket.id} is Ready in Room ${roomName}`);

            playersReadyCount++;

            if(playersReadyCount % 2 === 0) {
                pongNamespace.in(roomName).emit('startGame', socket.id);
            }
        });

        socket.on('paddleMove', (paddleData) => {
            socket.to(roomName).emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.to(roomName).emit('ballMove', ballData);
        });

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`);
            socket.leave(roomName);
        });
    });
}

module.exports = {
    listen
};