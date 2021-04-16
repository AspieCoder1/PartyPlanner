import React, { useEffect, useState } from 'react';
import styles from './Landing.module.scss';
import LandingHeader from './LandingHeader';
import img from '../../img/landingImage.svg';
import avatar from '../../img/avatar.svg';
import luke from '../../img/luke.svg';
import jeremy from '../../img/jeremy.svg';
import abbas from '../../img/abbas.svg';
import divin from '../../img/divin.svg';
import andrew from '../../img/andrew.svg';
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
			<br/>
			<div className={styles.about}>
				<h1 className={styles.aboutUs}>About Us</h1>
				<div className={styles.person}>
					<h2>Luke Braithwaite</h2>
					<img className={styles.avatar} src={luke} alt='avatar' />
					<p>I am Luke from Manchester, UK.
						<br/>I have experience with Server-side development and has had DevOps experience</p>
				</div>
				<div className={styles.person}>
					<h2>Jeremy Roe</h2>
					<img className={styles.avatar} src={jeremy} alt='avatar' />
					<p>I am Jeremy from London, UK.
						<br/>I have experience with Python and SQL.
						<br/>In my spare time I learn Japanese and French.
					</p>
				</div>
				<div className={styles.person}>
					<h2>Divin Jacob</h2>
					<img className={styles.avatar} src={divin} alt='avatar' />
					<p>Hi, my name is Divin, I am from Manchester.
						<br/>In my spare time I enjoy playing badminton and watching football.
						<br/>I have experience with .NET</p>
				</div>
				<div className={styles.person}>
					<h2>Abbas Sayed</h2>
					<img className={styles.avatar} src={abbas} alt='avatar' />
					<p>My name is Abbas and I am from Afghanistan!
						<br/>I am experienced in Web and Android/iOS Development.
						<br/>Unlike Luke, I love PHP so much &lt;3</p>
				</div>
				<div className={styles.person}>
					<h2>Radu Pirlog</h2>
					<img className={styles.avatar} src={avatar} alt='avatar' />
					<p>Hello! I am Radu from Romania!
						<br/>I have experience with C++ and Media editing.
						<br/>In my free time, I like to go for a drive and relax. </p>
				</div>
				<div className={styles.person}>
					<h2>Andrew</h2>
					<img className={styles.avatar} src={andrew} alt='avatar' />
					<p>Insert info about Andrew here</p>
				</div>
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
