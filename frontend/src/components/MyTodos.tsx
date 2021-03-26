import * as React from 'react';
import styles from './MyParties.module.scss';
import Task from './Task';

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
			<div>
				{error ? <p className={styles.error}>{error}</p> : null}
				{tasks.length > 1 ? tasks.map((task) => {
					console.log(task);
					return <Task key={task.id} task={task} />;
				}) : null}
			</div>
		);
	}
}

export default MyTodos;
