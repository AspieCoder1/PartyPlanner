import React from 'react';
import styles from './Party.module.scss';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Store } from '../redux/store';

type Props = {
	party: any;
};

const Party = ({ party }: Props): JSX.Element => {
	const userName = useSelector((state: Store) => state.user.userName);

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<p className={styles.cardTitle}>{party.name}</p>
				<p className={styles.cardHeader}>
					{userName === party.organiser ? 'Me' : party.organiser}
				</p>
			</div>
			<p className={styles.date}>
				{dayjs(party.date).format('MMMM D, YYYY')} at {party.time}
			</p>
			<p className={styles.cardText}>Location: {party.location}</p>
			<p className={styles.detailsText}>See details</p>
		</div>
	);
};

export default Party;
