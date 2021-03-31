import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type HookReturn = {
	messages: any[];
	sendMessage: (msgBody: string) => void;
};

const useChat = (chatID: string): HookReturn => {
	const [messages, setMessages] = useState<string[]>([]);
	const socketRef = useRef<Socket>();

	useEffect(() => {
		socketRef.current = io(`${process.env.REACT_APP_CHAT_URL}`);
		socketRef.current.on('hello', () => {
			console.log('hello from server');
		});

		socketRef.current?.on('new_msg', (msg: string) => {
			setMessages(messages => ([...messages, msg]));
		});

		// This now disconnects the socket and cleans everything up
		// Prevents us from having a hanging connection
		return () => {
			console.log('disconnecting');
			socketRef.current?.disconnect();
		};
	}, [chatID]);

	const sendMessage = (msgBody: string): void => {
		socketRef.current?.emit('new_msg', {
			msg: msgBody,
			room: chatID,
		});
	};

	return { messages, sendMessage };
};

export default useChat;
