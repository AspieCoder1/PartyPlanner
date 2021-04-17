import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = {
	body: string;
	user: string;
};

type HookReturn = {
	messages: Message[];
	sendMessage: (msgBody: Message) => void;
};

const useChat = (chatID: string, userName: string): HookReturn => {
	const [messages, setMessages] = useState<Message[]>([]);
	const socketRef = useRef<Socket>();

	useEffect(() => {
		const socketURL = process.env.REACT_APP_CHAT_URL || '';
		socketRef.current = io(`${socketURL}`);
		socketRef.current?.emit('join', chatID);

		socketRef.current?.on('get_messages', (msgArr: Message[]) => {
			console.log('receiving messages');
			setMessages(msgArr);
		});

		socketRef.current?.on('new_msg', (msg: Message) => {
			setMessages((messages) => [...messages, msg]);
		});

		// This now disconnects the socket and cleans everything up
		// Prevents us from having a hanging connection
		return () => {
			socketRef.current?.disconnect();
		};
	}, [chatID]);

	const sendMessage = (msgBody: Message): void => {
		setMessages((messages) => [...messages, msgBody]);
		const { body } = msgBody;
		socketRef.current?.emit('new_msg', {
			msg: { body, user: userName },
			room: chatID,
		});
	};

	return { messages, sendMessage };
};

export default useChat;
