import * as React from 'react';
import { Task as TaskType } from '../redux/task-slice';
import styles from './Task.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Props = {
	task: TaskType;
	deleteTask: (id: string) => void;
	toggle: (id: string, completed: boolean) => void;
};



export const Task = ({ task, deleteTask, toggle }: Props): JSX.Element => {
	const handleCompleted = (completed: boolean) => {
		return completed ? (
			<p className={styles.taskCompleted} onClick={() => toggle(task.id, task.taskcompleted)}>Completed</p>
		) : (
			<p className={styles.notCompleted} onClick={() => toggle(task.id, task.taskcompleted)}>Not completed</p>
		);
	};


	return (
		<div key={task.id} className={styles.taskContainer}>
			<div className={styles.closeContainer}>
				<button
					className={styles.closeButton}
					onClick={() => deleteTask(task.id)}
				>
					&times;
				</button>
			</div>
			<div className={styles.taskHeader}>
				<p className={styles.taskTitle}>{task.taskname}</p>
				{handleCompleted(task.taskcompleted)}
			</div>

			<p className={styles.taskDate}>
				{task.taskduedate
					? `Due ${dayjs(task.taskduedate).from(Date.now())}`
					: 'N/A'}
			</p>
			<p className={styles.taskDesc}>{task.taskdesc}</p>
		</div>
	);
};

export default Task;
