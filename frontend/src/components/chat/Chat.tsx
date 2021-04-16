import * as React from 'react';
import useChat from '../../hooks/useChat';
import { useParams } from 'react-router';
import Header from '../shared/Header';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import styles from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { Store } from '../../redux/store';
import Message from './Message';
import { Link } from 'react-router-dom';
import headerStyles from '../shared/Header.module.scss';

const Chat = (): JSX.Element => {
	const { userName } = useSelector((state: Store) => state.user);
	const { id } = useParams<{ id: string }>();
	const { messages, sendMessage } = useChat(id, userName);
	const [newMessage, setNewMessage] = React.useState<string>('');

	const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMessage(e.target.value);
	};

	const handleSendMessage = () => {
		sendMessage({ body: newMessage, user: userName });
		setNewMessage('');
	};

	return (
		<div className={styles.content}>
			<Helmet>
				<title>Chat for {id}</title>
			</Helmet>
			<Header>
				<Link className={headerStyles.headerLink} to={'/dashboard'}>Dashboard</Link>
				<Link className={headerStyles.headerLink} to={`/pictures/${id}`}>Pictures</Link>
				<Link className={headerStyles.headerLink} to={`/party/${id}`}>Party</Link>
			</Header>
			<div className={styles.container}>
				<div className={styles.chatArea}>
					{messages.length > 0 ? (
						messages.map((msg) => <Message key={_.uniqueId()} msg={msg} />)
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
