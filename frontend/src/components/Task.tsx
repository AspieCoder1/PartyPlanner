import * as React from 'react';
import { Task as TaskType } from '../redux/task-slice';
import styles from './Task.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Props = {
	task: TaskType;
};

const handleCompleted = (completed: boolean) => {
	return completed ? (
		<p className={styles.taskCompleted}>Completed</p>
	) : (
		<p className={styles.notCompleted}>Not completed</p>
	);
};

export const Task = ({ task }: Props): JSX.Element => {
	return (
		<div key={task.id} className={styles.taskContainer}>
			{handleCompleted(task.taskcompleted)}
			<p className={styles.taskText}>{task.taskname}</p>
			<p className={styles.taskText}>
				{task.taskduedate
					? `due ${dayjs(task.taskduedate).from(Date.now())}`
					: 'N/A'}
			</p>
		</div>
	);
};

export default Task;
