import * as React from 'react';
import { ReactChild } from 'react';
import styles from './Header.module.scss';
import logo from '../img/partyplanner.png';

type Props = {
	children?: ReactChild | ReactChild[];
};

const Header = (props: Props): JSX.Element => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.title}>
					<img src={logo} alt='PartyPlanner.io' />
				</div>
				<div className={styles.headerButtons}>{props.children}</div>
			</div>
		</header>
	);
};

export default Header;
