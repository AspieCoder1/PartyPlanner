import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from './Task';
import styles from './MyTodos.module.scss';
import { Store } from '../redux/store';
import { Task as TaskType, getTasks } from '../redux/task-slice';

const MyTodos = (): JSX.Element => {
	const id = useSelector((state: Store) => state.user.id);
	const tasks = useSelector((state: Store) => state.todos.tasks);
	const error = useSelector((state: Store) => state.todos.error);
	const tasksLoading = useSelector((state: Store) => state.todos.loading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTasks(id));
	}, []);

	return (
		<div>
			{error ? <p className={styles.error}>{error}</p> : null}
			{console.log(tasks)}
			{console.log(error)}
			{tasksLoading ? <div>Loading...</div> : null}
			{tasks.length > 0
				? tasks.map((task: TaskType) => <Task key={task.id} task={task} />)
				: null}
		</div>
	);
};

export default MyTodos;
