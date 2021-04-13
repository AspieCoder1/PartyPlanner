import * as React from 'react';
import { ReactChild } from 'react';
import styles from './Header.module.scss';
import logo from '../img/partyplanner.png';
import {useEffect, useState} from 'react';
// import {RegisterForm} from './RegisterForm';
import {SearchParty} from './SearchParty';
import ReactModal from 'react-modal';


type Props = {
	children?: ReactChild | ReactChild[];
};

const Header = (props: Props): JSX.Element => {
	// state
	const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

	// modal controls
	const closeSearchModal = () => {
		setSearchModalOpen(false);
	};

	const openSearchModal = () => {
		setSearchModalOpen(true);
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.title}>
					<img src={logo} alt='PartyPlanner.io' />
				</div>
				<div className={styles.headerButtons}>
					<button className={styles.button} onClick={openSearchModal}>Search</button>
					<button className={styles.logoutButton}>log out</button>
				</div>
				<div className={styles.headerButtons}>{props.children}</div>
			</div>
			<ReactModal
				overlayClassName={styles.overlay}
				className={styles.modal}
				isOpen={searchModalOpen}
				ariaHideApp={false}
			>
				<SearchParty closeModal={closeSearchModal} />
			</ReactModal>
		</header>

	);
};

export default Header;
