import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: true
	}
});

io.on('connection', (socket: Socket) => {
	console.log(`Connected to socket ${socket.id}`);
	socket.emit('hello');
});

httpServer.listen(9001);
