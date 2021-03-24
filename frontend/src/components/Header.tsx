import * as React from 'react';
import styles from './Header.module.scss';
import logo from '../img/partyplanner.jpg';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				{/*console.log(logo);*/}
				<h1 className={styles.title}><img src={logo} alt="Logo" /></h1>
				<div className={styles.headerButtons}>
					<button className={styles.logoutButton}>log out</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
