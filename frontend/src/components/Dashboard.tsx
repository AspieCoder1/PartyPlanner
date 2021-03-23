import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Store } from '../redux/store';
import { UserState } from '../redux/user-slice';
import styles from './Dashboard.module.scss';
import Header from './Header';
import MyParties from './MyParties';
import { getParties, PartyState } from '../redux/party-slice';

type IProps = {
	user: UserState;
	parties: PartyState;
	getParties: (id: string) => void;
};

export class Dashboard extends React.Component<IProps, never> {
	getParties = (): void => {
		this.props.getParties(this.props.user.id);
	};

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<Header />
				<div className={styles.container}>
					<h1 className={styles.title}>Hello, {this.props.user.userName}</h1>
					<p className={styles.paragraph}>
						The rest of the user dashboard content goes here.
					</p>
					<div>
						<Suspense fallback={<div>Loading...</div>}>
							<MyParties getParties={this.getParties} />
						</Suspense>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: Store) => ({
	user: state.user,
	parties: state.parties,
});
const mapDispatchToProps = {
	getParties,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
