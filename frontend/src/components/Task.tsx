import * as React from 'react';
import {Task as TaskType} from '../redux/task-slice';
import styles from './Task.module.scss';

type Props = {
	task: TaskType;
};

export const Task = ({ task }: Props) => {
	console.log(`Task: ${task}`);
	return (
		<div key={task.id} className={styles.taskContainer}>
			<p>{task.taskduedate ? task.taskduedate : 'N/A'}</p>
			<p>{task.taskname}</p>
		</div>
	);
};

export default Task;
