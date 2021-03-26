import * as React from 'react';
import styles from './MyParties.module.scss';

type Props = {
	getTodos: () => void;
	error: string;
	tasks: any[]
};

class MyTodos extends React.Component<Props, unknown> {
	componentDidMount(): void {
		this.props.getTodos();
	}

	render(): React.ReactNode {
		return (
			<div>
				{this.props.error ? (
					<p className={styles.error}>{this.props.error}</p>
				) : null}
				{this.props.tasks.length > 0?
					this.props.tasks.map((task: any) => <p key={task.id}>{task.taskname}</p>)
					: null
				}
			</div>
		);
	}
}

export default MyTodos;
