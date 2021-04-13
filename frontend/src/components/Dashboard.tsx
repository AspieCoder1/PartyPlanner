import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../redux/store';
import styles from './Dashboard.module.scss';
import Header from './Header';
import MyParties from './MyParties';
import MyTodos from './MyTodos';
import ReactModal from 'react-modal';
import { AddTaskForm } from './AddTaskForm';
import CreateParty from './CreateParty';

const Dashboard = (): JSX.Element => {
	const userName = useSelector((state: Store) => state.user.userName);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [partyModalOpen, setPartyModalOpen] = useState<boolean>(false);

	const closeModal = () => {
		setModalOpen(false);
	};

	const openModal = () => {
		setModalOpen(true);
	};

	const closePartyModal = () => {
		setPartyModalOpen(false);
	};

	const openPartyModal = () => {
		setPartyModalOpen(true);
	};

	return (
		<div className={styles.background}>
			<Header />
			<div className={styles.container}>
				<h1 className={styles.title}>Hello, {userName}</h1>
				<div className={styles.parties}>
					<div className={styles.header}>
						<h1>My Parties</h1>
						<button className={styles.addbutton} onClick={openPartyModal}>
							+
						</button>
					</div>
					<MyParties />
				</div>
				<div className={styles.tasks}>
					<div className={styles.header}>
						<h1>My Tasks</h1>
						<button className={styles.addbutton} onClick={openModal}>
							+
						</button>
					</div>
					<MyTodos />
				</div>
			</div>
			<ReactModal
				overlayClassName={styles.overlay}
				className={styles.modal}
				isOpen={modalOpen}
			>
				<AddTaskForm closeModal={closeModal} />
			</ReactModal>
			<ReactModal
				overlayClassName={styles.overlay}
				className={styles.modal}
				isOpen={partyModalOpen}
			>
				<CreateParty closeModal={closePartyModal} />
			</ReactModal>
		</div>
	);
};

export default Dashboard;
