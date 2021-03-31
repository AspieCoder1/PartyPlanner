import * as React from 'react';
import useChat from '../hooks/useChat';
import { useParams } from 'react-router';
import Header from './Header';
import _ from 'lodash';

const Chat = () => {
	const { id } = useParams<{ id: string }>();
	const { messages, sendMessage } = useChat(id);
	const [newMessage, setNewMessage] = React.useState<string>('');

	const handleNewMessageChange = (e: any) => {
		setNewMessage(e.target.value);
	};

	const handleSendMessage = () => {
		sendMessage(newMessage);
		setNewMessage('');
	};

	return (
		<>
			<Header />
			<h1>Chat for {id}</h1>
			<div>
				{messages.length > 0 ? messages.map((msg) => <p key={_.uniqueId()}>{msg}</p>) : null}
			</div>
			<div>
				<textarea
					value={newMessage}
					onChange={handleNewMessageChange}
					placeholder='Write message...'
					className='new-message-input-field'
				/>
				<button onClick={handleSendMessage} className='send-message-button'>
					Send
				</button>
			</div>
		</>
	);
};

export default Chat;
