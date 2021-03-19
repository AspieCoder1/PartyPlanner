import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../redux/store';
import { UserState } from '../redux/user-slice';
import styles from './Dashboard.module.scss';
import Header from './Header';

type IProps = {
	user: UserState;
};

export class Dashboard extends React.Component<IProps, never> {
	render(): React.ReactNode {
		return (
			<React.Fragment>
				<Header />
				<div className={styles.container}>
					<h1 className={styles.title}>Hello, {this.props.user.userName}</h1>
					<p className={styles.paragraph}>The rest of the user dashboard content goes here.</p>
				</div>

			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: Store) => ({ user: state.user });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
