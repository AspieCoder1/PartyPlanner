import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import './db';
import { Chat, ChatModel } from './chat';
import * as express from 'express';

const app: express.Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: true,
	},
	path: '/chat-service/socket/'
});

type Message = {
	body: string;
	user: string;
};

type NewMessageEvent = {
	msg: Message;
	room: string;
};

const port = process.env.PORT || 9001;

app.get('/chat-service/healthcheck', (req: express.Request, res: express.Response) => {
	res.status(200).json('Health check passed');
});

io.on('connection', (socket: Socket) => {
	console.log(`Connected to socket ${socket.id}`);

	socket.on('join', async (arg: string) => {
		socket.join(arg);
		try {
			const found = await Chat.find({ partyID: arg });
			const argToReturn = found.map(
				(doc: ChatModel): Message => ({
					body: doc.message,
					user: doc.userID,
				})
			);
			console.log(argToReturn);

			io.to(socket.id).emit('get_messages', argToReturn);
		} catch (e) {
			console.log(e.stackTrace());
		}
	});

	socket.on('new_msg', async ({ msg, room }: NewMessageEvent) => {
		socket.to(room).emit('new_msg', msg);
		try {
			const chat: ChatModel = await new Chat({
				partyID: room,
				message: msg.body,
				userID: msg.user,
			});

			await chat.save();
		} catch (e) {
			console.log(e.stackTrace());
		}

	});
});

httpServer.listen(port);
