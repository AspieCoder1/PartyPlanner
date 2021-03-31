import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer);

io.on('connection', (socket: Socket) => {
	console.log('Connected');
});

httpServer.listen(9001);
