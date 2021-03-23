import React from 'react';
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

type State = {
	partyLoading: boolean;
	error: string;
};

export class Dashboard extends React.Component<IProps, State> {
	state: State = {
		partyLoading: false,
		error: '',
	};

	static getDerivedStateFromProps(props: IProps, state: State): State {
		if (state.error != props.parties.error) {
			return {
				...state,
				error: props.parties.error,
			};
		}
		return state;
	}

	getParties = (): void => {
		this.setState({ partyLoading: true });
		this.props.getParties(this.props.user.userName);
		this.setState({ partyLoading: false });
	};

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<Header />
				<div className={styles.container}>
					<h1 className={styles.title}>Hello, {this.props.user.userName}</h1>
					<div className={styles.parties}>
						<h1>My Parties</h1>
						{this.state.partyLoading ? (
							<p>Loading...</p>
						) : (
							<MyParties
								error={this.state.error}
								getParties={this.getParties}
							/>
						)}
					</div>
					<div className={styles.todos}>
						<h1>Todos</h1>
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
