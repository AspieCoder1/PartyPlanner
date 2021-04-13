import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import { Link } from 'react-router-dom';
import Header from './Header';
import styles from './ViewParty.module.scss';
import headerStyles from './Header.module.scss';
import Map from './Map';
import dayjs from 'dayjs';
import { getParty, setParty } from '../redux/party-slice';

type Params = {
	id: string;
};

const ViewParty = (): JSX.Element => {
	const { id } = useParams<Params>();
	const dispatch = useDispatch();
	const party = useSelector((state: Store) => state.parties.party);
	const userName = useSelector((state: Store) => state.user.userName);

	useEffect(() => {
		dispatch(getParty(id));

		return () => {
			dispatch(setParty(undefined));
		};
	}, []);

	if (party) {
		return (
			<div>
				<Header>
					<Link className={headerStyles.headerLink} to={`/chat/${party._id}`}>
						chat
					</Link>
					<Link
						className={headerStyles.headerLink}
						to={`/pictures/${party._id}`}
					>
						pictures
					</Link>
				</Header>
				<div className={styles.container}>
					<h1 className={styles.title}>Hi {userName},</h1>
					<div className={styles.description}>{party.description}</div>
					<div className={styles.spanThree}>
						Date: {dayjs(party.date).format('MMMM D, YYYY')}
					</div>
					<div className={styles.spanThree}>Time: {party.time}</div>
					<div className={styles.spanThree}>
						Attendees: {party.attendeesID.length}
					</div>
					<div className={styles.location}>
						<h2>Location:</h2>
						<p>{party.location}</p>
						<Map address={party.location} />
					</div>
				</div>
			</div>
		);
	} else {
		return <p>Loading party</p>;
	}
};

export default ViewParty;
