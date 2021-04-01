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
import { TaskState, getTasks, addTask } from '../redux/task-slice';
import ReactModal from 'react-modal';
import { AddTaskForm } from './AddTaskForm';

type TaskToAdd = {
	taskname: string;
	taskdesc: string;
	taskdue: string;
};

type IProps = {
	user: UserState;
	parties: PartyState;
	todos: TaskState;
	getParties: (id: string) => void;
	getTasks: (id: string) => void;
	addTask: (taskToAdd: TaskToAdd) => void;
};

type State = {
	partyLoading: boolean;
	todoLoading: boolean;
	partyError: string;
	todoError: string;
	modalOpen: boolean;
	parties: any[];
	tasks: any[];
};

export class Dashboard extends React.Component<IProps, State> {
	state: State = {
		partyLoading: false,
		todoLoading: false,
		partyError: '',
		todoError: '',
		modalOpen: false,
		parties: [],
		tasks: [],
	};

	static getDerivedStateFromProps(props: IProps, state: State): State {
		const partyError = props.parties.error ? props.parties.error : '';
		const todoError = props.todos.error ? props.todos.error : '';
		if (
			state.partyError !== props.parties.error ||
			state.todoError !== props.todos.error ||
			state.tasks !== props.todos.tasks ||
			state.parties !== props.parties.parties
		) {
			return {
				...state,
				partyError,
				todoError,
				parties: props.parties.parties,
				tasks: props.todos.tasks,
			};
		}
		return state;
	}

	getParties = (): void => {
		this.setState({ partyLoading: true });
		this.props.getParties(this.props.user.userName);
		this.setState({ partyLoading: false });
	};

	getTasks = (): void => {
		this.setState({ todoLoading: true });
		this.props.getTasks(this.props.user.userName);
		this.setState({ todoLoading: false });
	};

	addTask = (taskToAdd: TaskToAdd): void => {
		console.log(taskToAdd.taskdue);
		const taskduedate = taskToAdd.taskdue;

		const task = {
			...taskToAdd,
			taskduedate,
			taskcreator: this.props.user.userName
		};
		this.props.addTask(task);
		console.log(task);
	};

	openModal = (): void => {
		this.setState({ modalOpen: true });
	};

	closeModal = (): void => {
		this.setState({ modalOpen: false });
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
						<h1>My Tasks</h1>
						<button onClick={this.openModal}>Add Task</button>
						{this.state.todoLoading ? (
							<p>Loading...</p>
						) : (
							<MyTodos
								// getTodos={this.getTasks}
								// error={this.state.todoError}
								// tasks={this.state.tasks}
							/>
						)}
					</div>
				</div>
				<ReactModal isOpen={this.state.modalOpen}>
					<AddTaskForm closeModal={this.closeModal} onSubmit={this.addTask} />
				</ReactModal>
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
	getTasks,
	addTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
