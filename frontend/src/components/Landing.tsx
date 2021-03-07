import * as React from 'react';
import styles from './Landing.module.scss';
import LandingHeader from './LandingHeader';
import img from '../img/landingImage.svg';
import ReactModal from 'react-modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type IState = {
	loginModalOpen: boolean;
	registerModalOpen: boolean;
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

export default class Landing extends React.Component<unknown, IState> {
	onLoginModelClose = (): void => {
		this.setState({ loginModalOpen: false });
	};

	openLoginModel = (): void => {
		this.setState({ loginModalOpen: true });
	};

	onRegisterModelClose = (): void => {
		this.setState({ registerModalOpen: false });
	};

	openRegisterModel = (): void => {
		this.setState({ registerModalOpen: true });
	};

	onRegisterSubmit = (userToRegister: userToRegister): void => {
		console.log(userToRegister);
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
