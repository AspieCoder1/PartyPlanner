import React, { useEffect, useState } from 'react';
import styles from './Landing.module.scss';
import LandingHeader from './LandingHeader';
import img from '../../img/landingImage.svg';
import ReactModal from 'react-modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useSelector } from 'react-redux';
import { Store } from '../../redux/store';
import history from '../../utils/history';

const Landing = (): JSX.Element => {
	// State
	const status = useSelector((state: Store) => state.user.status);
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

	useEffect(() => {
		if (status === 'success') {
			history.push('/dashboard');
		}
	}, [status]);

	return (
		<>
			<LandingHeader onClickLogin={openLoginModal} onClickRegister={openRegisterModal} />
			<div className={styles.container}>
				<h2 className={styles.title}>Take the stress out of party planning</h2>
				<p className={styles.paragraph}>
					We all know party planning is hard. But it does not have to be. PartyPlanner.io provides you with all the
					tools you need in order to have a stress-free party. So relax, get a drink and give PartyPlanner a try!
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
				ariaHideApp={false}
			>
				<LoginForm closeModal={closeLoginModal} />
			</ReactModal>
			<ReactModal
				overlayClassName={styles.overlay}
				className={styles.modal}
				isOpen={registerModalOpen}
				ariaHideApp={false}
			>
				<RegisterForm closeModal={closeRegisterModal} />
			</ReactModal>
		</>
	);
};
export default Landing;
