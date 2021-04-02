import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import * as _ from 'lodash';
import history from '../utils/history';

type userToRegister = {
	email: string;
	username: string;
	password: string;
};

type userLoginObject = {
	email: string;
	password: string;
};

const Landing = (): JSX.Element => {
	// Redux connection setup
	const dispatch = useDispatch();
	const errors: UserErrors = useSelector((state: Store) => state.user.errors);

	// State
	const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
	const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

	// Modal controls
	const openLoginModal = (): void => {
		setLoginModalOpen(true);
	};
	const closeLoginModal = (): void => {
		setLoginModalOpen(false);
	};
	const openRegisterModal = (): void => {
		setRegisterModalOpen(true);
	};
	const closeRegisterModal = (): void => {
		setRegisterModalOpen(false);
	};

	// Form Submission
	const onRegisterSubmit = async (
		userToRegister: userToRegister
	): Promise<UserErrors> => {
		await dispatch(registerUser(userToRegister));
		return errors;
	};

	const onLoginSubmit = async (
		userToLogin: userLoginObject
	): Promise<UserErrors> => {
		await dispatch(loginUser(userToLogin));
		return errors;
	};

	const status = useSelector((state: Store) => state.user.status);
	useEffect(() => {
		if (status === 'success') {
			history.push('/dashboard');
		}
	}, [status]);

	return (
		<>
			<LandingHeader
				onClickLogin={openLoginModal}
				onClickRegister={openRegisterModal}
			/>
			<div className={styles.container}>
				<h2 className={styles.title}>Take the stress out of party planning</h2>
				<p className={styles.paragraph}>
					We all know party planning is hard. But it does not have to be.
					PartyPlanner.io provides you with all the tools you need in order to
					have a stress-free party. So relax, get a drink and give PartyPlanner
					a try!
				</p>
				<button className={styles.button} onClick={openRegisterModal}>
					Get PartyPlanner
				</button>
				<img className={styles.img} src={img} alt='' />
			</div>
			<ReactModal
				overlayClassName={styles.overlay}
				className={styles.modal}
				isOpen={loginModalOpen}
				appElement={document.getElementById('login-form') as HTMLElement}
			>
				<div id='login-form'>
					<LoginForm closeModal={closeLoginModal} onSubmit={onLoginSubmit} />
				</div>
			</ReactModal>
			<ReactModal
				overlayClassName={styles.overlay}
				className={styles.modal}
				isOpen={registerModalOpen}
				appElement={document.getElementById('register-form') as HTMLElement}
			>
				<div id='register-form'>
					<RegisterForm
						closeModal={closeRegisterModal}
						onSubmit={onRegisterSubmit}
					/>
				</div>
			</ReactModal>
		</>
	);
};
export default Landing;

// TODO: Refactor landing component to use hooks
// export class Landing extends React.Component<IProps, IState> {
// 	static getDerivedStateFromProps(props: IProps, state: IState) {
// 		if (props.user.errors !== state.errors) {
// 			return {
// 				errors: props.user.errors,
// 			};
// 		}
// 		return state;
// 	}
//
// 	onLoginModelClose = (): void => {
// 		this.setState(
// 			(prevState: IState): IState => ({
// 				...prevState,
// 				loginModalOpen: false,
// 				errors: {},
// 			})
// 		);
// 		this.props.setErrors({});
// 	};
//
// 	openLoginModel = (): void => {
// 		this.setState(
// 			(prevState: IState): IState => ({ ...prevState, loginModalOpen: true })
// 		);
// 	};
//
// 	onRegisterModelClose = (): void => {
// 		this.setState(
// 			(prevState: IState): IState => ({
// 				...prevState,
// 				registerModalOpen: false,
// 				errors: {},
// 			})
// 		);
// 		this.props.setErrors({});
// 	};
//
// 	openRegisterModel = (): void => {
// 		this.setState(
// 			(prevState: IState): IState => ({ ...prevState, registerModalOpen: true })
// 		);
// 	};
//
// 	onRegisterSubmit = async (
// 		userToRegister: userToRegister
// 	): Promise<UserErrors> => {
// 		await this.props.registerUser(userToRegister);
// 		if (_.isEmpty(this.state.errors)) {
// 			await this.props.loginUser({
// 				email: userToRegister.email,
// 				password: userToRegister.password,
// 			});
// 		}
// 		if (_.isEmpty(this.state.errors)) {
// 			history.push('/dashboard');
// 		}
// 		return this.state.errors;
// 	};
//
// 	onLoginSubmit = async (userToLogin: userLoginObject): Promise<UserErrors> => {
// 		await this.props.loginUser(userToLogin);
// 		if (_.isEmpty(this.state.errors)) {
// 			history.push('/dashboard');
// 		}
// 		return this.state.errors;
// 	};
//
// 	state: IState = {
// 		loginModalOpen: false,
// 		registerModalOpen: false,
// 		errors: {},
// 	};
//
// 	render(): React.ReactNode {
// 		return (
// 			<div>
// 				<LandingHeader
// 					onClickLogin={this.openLoginModel}
// 					onClickRegister={this.openRegisterModel}
// 				/>
// 				<div className={styles.container}>
// 					<h2 className={styles.title}>
// 						Take the stress out of party planning
// 					</h2>
// 					<p className={styles.paragraph}>
// 						We all know party planning is hard. But it does not have to be.
// 						PartyPlanner.io provides you with all the tools you need in order to
// 						have a stress-free party. So relax, get a drink and give
// 						PartyPlanner a try!
// 					</p>
// 					<button className={styles.button} onClick={this.openRegisterModel}>
// 						Get PartyPlanner
// 					</button>
// 					<img className={styles.img} src={img} alt='' />
// 				</div>
// 				<ReactModal
// 					overlayClassName={styles.overlay}
// 					className={styles.modal}
// 					isOpen={this.state.loginModalOpen}
// 					appElement={document.getElementById('login-form') as HTMLElement}
// 				>
// 					<div id='login-form'>
// 						<LoginForm
// 							closeModal={this.onLoginModelClose}
// 							onSubmit={this.onLoginSubmit}
// 						/>
// 					</div>
// 				</ReactModal>
// 				<ReactModal
// 					overlayClassName={styles.overlay}
// 					className={styles.modal}
// 					isOpen={this.state.registerModalOpen}
// 					appElement={document.getElementById('register-form') as HTMLElement}
// 				>
// 					<div id='register-form'>
// 						<RegisterForm
// 							closeModal={this.onRegisterModelClose}
// 							onSubmit={this.onRegisterSubmit}
// 						/>
// 					</div>
// 				</ReactModal>
// 			</div>
// 		);
// 	}
// }
//
// const mapStateToProps = (state: Store) => ({ user: state.user });
// const mapDispatchToProps = { registerUser, loginUser, setErrors };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Landing);
