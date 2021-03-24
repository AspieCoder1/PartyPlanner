import * as React from 'react';
import styles from './Header.module.scss';
import logo from '../img/partyplanner.png';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				{/*console.log(logo);*/}
				<div className={styles.title}><img src={logo} alt="PartyPlanner.io" /></div>
				<div className={styles.headerButtons}>
					<button className={styles.logoutButton}>log out</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
