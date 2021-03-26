import * as React from 'react';

type Props = {
	task: any;
};

export const Task = ({ task }: Props) => {
	return <p key={task.id}>{task.taskname}</p>;
};

export default Task;