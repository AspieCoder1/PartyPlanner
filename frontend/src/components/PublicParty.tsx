import React from 'react';
import { Party } from '../redux/party-slice';
import styles from './PublicParty.module.scss';
import dayjs from 'dayjs';

type Props = {
	party: Party;
};

const PublicParty = ({ party }: Props): JSX.Element => {
	return <div className={styles.container}>
		<div className={styles.titleGroup}>
			<p className={styles.title}>{party.name}</p>
			{party.ageRate ? <p className={styles.date}>18+</p> : null}
		</div>
		<p className={styles.date}>{dayjs(party.date).format('DD MMMM, YYYY')} at {party.time}</p>
		<p className={styles.description}>{party.description}</p>
		<button className={styles.button}>Attend</button>
	</div>;
};

export default PublicParty;
