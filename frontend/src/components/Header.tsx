import * as React from 'react';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<h1 className={styles.title}>PartyPlanner.io</h1>
				<div className={styles.headerButtons}>
					<button className={styles.logoutButton}>
						log out
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;