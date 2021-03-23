import * as React from 'react';
import styles from './MyParties.module.scss';

type Props = {
	getParties: () => void;
	error: string;
};

class MyParties extends React.Component<Props, unknown> {
	componentDidMount(): void {
		this.props.getParties();
	}

	render(): React.ReactNode {
		return (
			<>
				{this.props.error ? <p className={styles.error}>{this.props.error}</p> : null}
			</>
		);
	}
}

export default MyParties;
