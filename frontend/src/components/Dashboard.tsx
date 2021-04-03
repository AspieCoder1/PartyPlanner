import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import styles from './Dashboard.module.scss';
import Header from './Header';
import MyParties from './MyParties';
import { Link } from 'react-router-dom';
import MyTodos from './MyTodos';
import ReactModal from 'react-modal';
import { AddTaskForm } from './AddTaskForm';
import { addTask } from '../redux/task-slice';

const Dashboard = (): JSX.Element => {
	const userName = useSelector((state: Store) => state.user.userName);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const closeModal = () => {
		setModalOpen(false);
	};

	const openModal = () => {
		setModalOpen(true);
	};

	return (
		<div className={styles.background}>
			<Header />
			<div className={styles.container}>
				<h1 className={styles.title}>Hello, {userName}</h1>
				<div className={styles.parties}>
					<div className={styles.header}>
						<h1>My Parties</h1>
						<Link className={styles.addbutton} to={'/create'}>
							+
						</Link>
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
			<ReactModal isOpen={modalOpen}>
				<AddTaskForm closeModal={closeModal} />
			</ReactModal>
		</div>
	);
};

export default Dashboard;
