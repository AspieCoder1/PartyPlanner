import React from 'react';
import { connect } from 'react-redux';
import { Store } from '../redux/store';
import { UserState } from '../redux/user-slice';
import styles from './Dashboard.module.scss';
import Header from './Header';
import MyParties from './MyParties';
import { getParties, PartyState } from '../redux/party-slice';
import { Link } from 'react-router-dom';
import MyTodos from './MyTodos';
import { TodoState, getTodos } from '../redux/todo-slice';

type IProps = {
	user: UserState;
	parties: PartyState;
	todos: TodoState;
	getParties: (id: string) => void;
	getTodos: (id: string) => void;
};

type State = {
	partyLoading: boolean;
	todoLoading: boolean;
	partyError: string;
	todoError: string;
};

export class Dashboard extends React.Component<IProps, State> {
	state: State = {
		partyLoading: false,
		todoLoading: false,
		partyError: '',
		todoError: '',
	};

	static getDerivedStateFromProps(props: IProps, state: State): State {
		const partyError =  props.parties.error ? props.parties.error : '';
		const todoError =  props.todos.error ? props.todos.error : '';
		if (state.partyError != props.parties.error || state.todoError != props.todos.error) {
			return {
				...state,
				partyError,
				todoError
			};
		}
		return state;
	}

	getParties = (): void => {
		this.setState({ partyLoading: true });
		this.props.getParties(this.props.user.userName);
		this.setState({ partyLoading: false });
	};

	getTodos = (): void => {
		this.setState({ todoLoading: true });
		this.props.getTodos(this.props.user.userName);
		this.setState({ todoLoading: false });
	};

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<Header />
				<div className={styles.container}>
					<h1 className={styles.title}>Hello, {this.props.user.userName}</h1>
					<div className={styles.parties}>
						<h1>My Parties</h1>
						<Link to={'/create'}> Create a party</Link>
						{this.state.partyLoading ? (
							<p>Loading...</p>
						) : (
							<MyParties
								error={this.state.partyError}
								getParties={this.getParties}
							/>
						)}
					</div>
					<div className={styles.todos}>
						<h1>Todos</h1>
						{this.state.todoLoading ? (
							<p>Loading...</p>
						) : (
							<MyTodos getTodos={this.getTodos} error={this.state.todoError} />
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: Store) => ({
	user: state.user,
	parties: state.parties,
	todos: state.todos,
});
const mapDispatchToProps = {
	getParties,
	getTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
