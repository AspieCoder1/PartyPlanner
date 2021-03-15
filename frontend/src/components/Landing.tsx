import * as React from 'react';
import styles from './Landing.module.scss';
import LandingHeader from './LandingHeader';
import img from '../img/landingImage.svg';
import ReactModal from 'react-modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { registerUser, loginUser } from '../redux/user-slice';
import { connect } from 'react-redux';

type IState = {
	loginModalOpen: boolean;
	registerModalOpen: boolean;
};

type IProps = {
	registerUser: (user: userToRegister) => void;
	loginUser: (user: userLoginObject) => void;
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
	onLoginModelClose = (): void => {
		this.setState(
			(prevState: IState): IState => ({
				...prevState,
				loginModalOpen: false,
			})
		);
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
			})
		);
	};

	openRegisterModel = (): void => {
		this.setState(
			(prevState: IState): IState => ({ ...prevState, registerModalOpen: true })
		);
	};

	onRegisterSubmit = async (userToRegister: userToRegister) => {
		console.log(userToRegister);
		await this.props.registerUser(userToRegister);
		await this.props.loginUser({
			email: userToRegister.email,
			password: userToRegister.password,
		});
	};

	onLoginSubmit = (userToLogin: userLoginObject): void => {
		console.log(userToLogin);
	};

	state: IState = {
		loginModalOpen: false,
		registerModalOpen: false,
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

const mapStateToProps = (state: any) => ({ user: state.user });
const mapDispatchToProps = { registerUser, loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
