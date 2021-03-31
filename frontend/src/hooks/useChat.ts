import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useChat = (chatID: string) => {
	const [messages, setMessages] = useState([]);
	const socketRef = useRef<Socket>();

	useEffect(() => {
		socketRef.current = io(`${process.env.REACT_APP_CHAT_URL}`);
		socketRef.current.on('hello', () => {
			console.log('hello from server');
		});

		// This now disconnects the socket and cleans everything up
		// Prevents us from having a hanging connection
		return () => {
			socketRef.current?.disconnect();
		};
	}, [chatID]);

	return { messages };
};

export default useChat;
