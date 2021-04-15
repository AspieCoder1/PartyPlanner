import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from './Task';
import styles from './MyTodos.module.scss';
import { Store } from '../../redux/store';
import { Task as TaskType, getTasks, deleteTask as deleteTaskAction, toggleCompleted } from '../../redux/task-slice';

const MyTodos = (): JSX.Element => {
	const userName = useSelector((state: Store) => state.user.userName);
	const tasks = useSelector((state: Store) => state.todos.tasks);
	const error = useSelector((state: Store) => state.todos.error);
	const tasksLoading = useSelector((state: Store) => state.todos.loading);
	const dispatch = useDispatch();

	const deleteTask = async (id: string) => {
		await dispatch(deleteTaskAction(id));
	};

	const toggle = (id: string, completed: boolean): void => {
		dispatch(toggleCompleted({ id, completed }));
	};

	useEffect(() => {
		dispatch(getTasks(userName));
	}, []);

	return (
		<div className={styles.grid}>
			{error ? <p className={styles.error}>{error}</p> : null}
			{tasksLoading ? <p className={styles.loading}>Loading...</p> : null}
			{tasks.length > 0
				? tasks.map((task: TaskType) => <Task key={task.id} task={task} deleteTask={deleteTask} toggle={toggle} />)
				: null}
		</div>
	);
};

export default MyTodos;
