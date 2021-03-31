import React from 'react';
import useChat from '../hooks/useChat';
import { useParams } from 'react-router';

const Chat = () => {
	const { id } = useParams<{ id: string }>();
	const { messages } = useChat(id);
	return (
		<>
			<h1>Chat for {id}</h1>
		</>
	);
};

export default Chat;
