import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: true,
	},
});

type NewMessageEvent = {
	msg: string;
	room: string;
};

io.on('connection', (socket: Socket) => {
	console.log(`Connected to socket ${socket.id}`);

	socket.on('join', (arg: string) => {
		socket.join(arg);
	});

	socket.on('new_msg', ({ msg, room }: NewMessageEvent) => {
		socket.to(room).emit('new_msg', msg);
	});
});

httpServer.listen(9001);
