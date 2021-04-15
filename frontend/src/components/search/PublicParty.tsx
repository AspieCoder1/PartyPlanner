import React from 'react';
import { joinParty, Party } from '../../redux/party-slice';
import styles from './PublicParty.module.scss';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../redux/store';

type Props = {
	party: Party;
};

const PublicParty = ({ party }: Props): JSX.Element => {
	const dispatch = useDispatch();
	const userName: string = useSelector((state: Store) => state.user.userName);
	const buttonText: string = party.attendeesID.indexOf(userName) === -1 ? 'Attend' : 'Attending';

	const buttonDisabled = party.attendeesID.indexOf(userName) !== -1;

	const onClick = () => {
		dispatch(joinParty({ partyId: party._id, userId: userName }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.titleGroup}>
				<p className={styles.title}>{party.name}</p>
				{party.ageRate ? <p className={styles.date}>18+</p> : null}
			</div>
			<p className={styles.date}>
				{dayjs(party.date).format('DD MMMM, YYYY')} at {party.time}
			</p>
			<p className={styles.description}>{party.description}</p>
			<button className={styles.button} onClick={onClick} disabled={buttonDisabled}>
				{buttonText}
			</button>
		</div>
	);
};

export default PublicParty;
