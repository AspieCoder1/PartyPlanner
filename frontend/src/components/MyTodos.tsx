import * as React from 'react';
import Task from './Task';
import styles from './MyTodos.module.scss';

type Props = {
	getTodos: () => void;
	error: string;
	tasks: any[];
};

class MyTodos extends React.Component<Props, unknown> {
	componentDidMount(): void {
		this.props.getTodos();
	}

	render(): React.ReactNode {
		console.log(this.props.tasks);
		const { tasks, error } = this.props;
		return (
			<div className={styles.todoContainer}>
				{error ? <p className={styles.error}>{error}</p> : null}
				{tasks.length > 0
					? tasks.map((task) => <Task key={task.id} task={task} />)
					: null}
			</div>
		);
	}
}

export default MyTodos;
