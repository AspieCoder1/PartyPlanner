import * as React from 'react';
import {Link} from 'react-router-dom';
import styles from './Landing.module.scss';
import LandingHeader from './LandingHeader';
import img from '../img/landingImage.svg';
import ReactModal from 'react-modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import {
	registerUser,
	loginUser,
	setErrors,
	UserState,
	UserErrors,
} from '../redux/user-slice';
import { connect } from 'react-redux';
import { Store } from '../redux/store';
import * as _ from 'lodash';
import {withRouter} from 'react-router-dom';

type IState = {
	loginModalOpen: boolean;
	registerModalOpen: boolean;
	errors: UserErrors;
};

type IProps = {
	registerUser: (user: userToRegister) => void;
	loginUser: (user: userLoginObject) => void;
	setErrors: (user: UserErrors) => void;
	user: UserState;
};

type userToRegister = {
	email: string;
	username: string;
	password: string;
};

type userLoginObject = {
	email: string;
	password: string;
};

export class Landing extends React.Component<IProps, IState> {
	static getDerivedStateFromProps(props: IProps, state: IState) {
		if (props.user.errors !== state.errors) {
			return {
				errors: props.user.errors,
			};
		}
		return state;
	}

	onLoginModelClose = (): void => {
		this.setState(
			(prevState: IState): IState => ({
				...prevState,
				loginModalOpen: false,
				errors: {},
			})
		);
		this.props.setErrors({});
	};

	openLoginModel = (): void => {
		this.setState(
			(prevState: IState): IState => ({ ...prevState, loginModalOpen: true })
		);
	};

	onRegisterModelClose = (): void => {
		this.setState(
			(prevState: IState): IState => ({
				...prevState,
				registerModalOpen: false,
				errors: {},
			})
		);
		this.props.setErrors({});
	};

	openRegisterModel = (): void => {
		this.setState(
			(prevState: IState): IState => ({ ...prevState, registerModalOpen: true })
		);
	};

	onRegisterSubmit = async (
		userToRegister: userToRegister
	): Promise<UserErrors> => {
		await this.props.registerUser(userToRegister);
		if (_.isEmpty(this.state.errors)) {
			await this.props.loginUser({
				email: userToRegister.email,
				password: userToRegister.password,
			});
		}
		return this.state.errors;
	};

	onLoginSubmit = async (userToLogin: userLoginObject): Promise<UserErrors> => {
		await this.props.loginUser(userToLogin);
		return this.state.errors;
	};

	state: IState = {
		loginModalOpen: false,
		registerModalOpen: false,
		errors: {},
	};

	render(): React.ReactNode {
		return (
			<div>
				<LandingHeader
					onClickLogin={this.openLoginModel}
					onClickRegister={this.openRegisterModel}
				/>
				<div className={styles.container}>
					<h2 className={styles.title}>
						Take the stress out of party planning
					</h2>
					<p className={styles.paragraph}>
						We all know party planning is hard. But it does not have to be.
						PartyPlanner.io provides you with all the tools you need in order to
						have a stress-free party. So relax, get a drink and give
						PartyPlanner a try!
					</p>
					<button className={styles.button} onClick={this.openRegisterModel}>
						Get PartyPlanner
					</button>
					<img className={styles.img} src={img} alt='' />
				</div>
				<ReactModal
					overlayClassName={styles.overlay}
					className={styles.modal}
					isOpen={this.state.loginModalOpen}
				>
					<LoginForm
						closeModal={this.onLoginModelClose}
						onSubmit={this.onLoginSubmit}
					/>
				</ReactModal>
				<ReactModal
					overlayClassName={styles.overlay}
					className={styles.modal}
					isOpen={this.state.registerModalOpen}
				>
					<RegisterForm
						closeModal={this.onRegisterModelClose}
						onSubmit={this.onRegisterSubmit}
					/>
				</ReactModal>
			</div>
		);
	}
}

const mapStateToProps = (state: Store) => ({ user: state.user });
const mapDispatchToProps = { registerUser, loginUser, setErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
