import * as React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../redux/store';
import styles from './Chat.module.scss';

type Message = {
	body: string;
	user: string;
};

type Props = {
	msg: Message;
};

const Message = ({ msg }: Props): JSX.Element => {
	const { user, body } = msg;
	const { userName } = useSelector((state: Store) => state.user);
	if (user === userName) {
		return (
			<div className={styles.message}>
				<p className={styles.messageName}>{user}</p>
				<p className={styles.messageText}>{body}</p>
			</div>
		);
	} else {
		return (
			<div className={styles.otherUserMessage}>
				<p className={styles.messageOtherName}>{user}</p>
				<p className={styles.messageOtherText}>{body}</p>
			</div>
		);
	}
};

export default Message;
