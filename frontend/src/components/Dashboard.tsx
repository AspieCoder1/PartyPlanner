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
import {addTask} from '../redux/task-slice';

type TaskToAdd = {
	taskname: string;
	taskdesc: string;
	taskdue: string;
};

const Dashboard = (): JSX.Element => {
	const dispatch = useDispatch();
	const userName = useSelector((state: Store) => state.user.userName);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const closeModal = () => {
		setModalOpen(false);
	};

	const openModal = () => {
		setModalOpen(true);
	};

	const onSubmit = (taskToAdd: TaskToAdd): void => {
		const taskduedate = taskToAdd.taskdue;

		const task = {
			...taskToAdd,
			taskduedate,
			taskcreator: userName,
		};
		console.log(task);
		dispatch(addTask(task));
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<h1 className={styles.title}>Hello, {userName}</h1>
				<div className={styles.parties}>
					<h1>My Parties</h1>
					<Link to={'/create'}> Create a party</Link>
					<MyParties />
				</div>
				<div className={styles.todos}>
					<h1>My Tasks</h1>
					<button onClick={openModal}>Add Task</button>
					<MyTodos />
				</div>
			</div>
			<ReactModal isOpen={modalOpen}>
				<AddTaskForm closeModal={closeModal} onSubmit={onSubmit} />
			</ReactModal>
		</>
	);
};

export default Dashboard;
