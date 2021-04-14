import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import { Link } from 'react-router-dom';
import Header from './shared/Header';
import styles from './ViewParty.module.scss';
import headerStyles from './shared/Header.module.scss';
import Map from './dashboard/Map';
import dayjs from 'dayjs';
import { getParty, setParty } from '../redux/party-slice';
import Attendees from './Attendees';
import ReactModal from 'react-modal';
import EditParty from './EditParty';
import Invite from './Invite';

type Params = {
	id: string;
};

const ViewParty = (): JSX.Element => {
	const { id } = useParams<Params>();
	const dispatch = useDispatch();
	const party = useSelector((state: Store) => state.parties.party);
	const userName = useSelector((state: Store) => state.user.userName);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getParty(id));

		return () => {
			dispatch(setParty(undefined));
		};
	}, []);

	const openModal = () => {
		setModalOpen((modalOpen: boolean) => !modalOpen);
	};

	const openInviteModal = () => {
		setInviteModalOpen((inviteModalOpen: boolean) => !inviteModalOpen);
	};

	if (party) {
		const isOrganiser: boolean = party.organiser === userName;
		return (
			<div>
				<Header>
					<Link className={headerStyles.headerLink} to={'/dashboard'}>
						Dashboard
					</Link>
					<Link className={headerStyles.headerLink} to={'/search'}>
						Search
					</Link>
					{isOrganiser ? (
						<button
							className={headerStyles.headerLink}
							onClick={openInviteModal}
						>
							Invite
						</button>
					) : (
						<></>
					)}
					{isOrganiser ? (
						<button className={headerStyles.headerLink} onClick={openModal}>
							Edit
						</button>
					) : (
						<></>
					)}
					<Link className={headerStyles.headerLink} to={`/chat/${party._id}`}>
						Chat
					</Link>
					<Link
						className={headerStyles.headerLink}
						to={`/pictures/${party._id}`}
					>
						Pictures
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
					<div
						className={isOrganiser ? styles.locationOrganiser : styles.location}
					>
						<h2>Location:</h2>
						<p>{party.location}</p>
						<Map address={party.location} />
					</div>
					{isOrganiser ? <Attendees attendees={party.attendeesID} /> : null}
				</div>
				<ReactModal
					className={styles.modal}
					overlayClassName={styles.overlay}
					isOpen={modalOpen}
				>
					<EditParty closeModal={openModal} />
				</ReactModal>
				<ReactModal
					isOpen={inviteModalOpen}
					className={styles.modal}
					overlayClassName={styles.overlay}
				>
					<Invite closeModal={openInviteModal} />
				</ReactModal>
			</div>
		);
	} else {
		return <p>Loading party</p>;
	}
};

export default ViewParty;
