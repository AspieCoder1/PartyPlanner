import * as React from 'react';
import useChat from '../hooks/useChat';
import { useParams } from 'react-router';
import Header from './Header';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import styles from './Chat.module.scss';

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
		<div className={styles.content}>
			<Helmet>
				<title>Chat for {id}</title>
			</Helmet>
			<Header />
			<div className={styles.container}>
				<div className={styles.chatArea}>
					{messages.length > 0 ? (
						messages.map((msg) => (
							<p className={styles.message} key={_.uniqueId()}>
								{msg}
							</p>
						))
					) : (
						<p className={styles.noMessages}>You have no messages currently</p>
					)}
				</div>
				<div className={styles.chatSubmit}>
					<input
						value={newMessage}
						onChange={handleNewMessageChange}
						placeholder='Write message...'
						className={styles.chatInput}
					/>
					<button onClick={handleSendMessage} className={styles.chatButton}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
