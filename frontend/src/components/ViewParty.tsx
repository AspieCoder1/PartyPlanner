import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Store } from '../redux/store';
import {Link} from 'react-router-dom';
import Header from './Header';
import styles from './ViewParty.module.scss';
import Map from './Map';
import dayjs from 'dayjs';

type Params = {
	id: string;
};

const ViewParty = (): JSX.Element => {
	const { id } = useParams<Params>();
	const party = useSelector((state: Store) =>
		state.parties.parties.find((party) => party._id === id)
	);
	const userName = useSelector((state: Store) => state.user.userName);
	console.log(party);
	if (party) {
		return (
			<div>
				<Header />
				<div className={styles.container}>
					<h1 className={styles.title}>Hi {userName},</h1>
					<div className={styles.description}>{party.description}</div>
					<div className={styles.spanThree}>
						Date: {dayjs(party.date).format('MMMM D, YYYY')}
					</div>
					<div className={styles.spanThree}>
						Time: {party.time}
					</div>
					<div className={styles.spanThree}>
						Attendees: {party.attendeesID.length}
					</div>
					<div className={styles.location}>
						<h2>Location:</h2>
						<p>{party.location}</p>
						<Map address={party.location}/>
					</div>
					<div className={styles.card}>
						<Link to={`/chat/${party._id}`}>Go to chat</Link>
					</div>
				</div>
			</div>
		);
	} else {
		return <p>Party ID is undefined</p>;
	}
};

export default ViewParty;
