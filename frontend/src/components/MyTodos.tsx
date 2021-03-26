import * as React from 'react';
import styles from './MyParties.module.scss';

type Props = {
	getTodos: () => void;
	error: string;
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
			</div>
		);
	}
}

export default MyTodos;
