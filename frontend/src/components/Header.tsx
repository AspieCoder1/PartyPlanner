import * as React from 'react';
import { ReactChild } from 'react';
import styles from './Header.module.scss';
import logo from '../img/partyplanner.png';
import { logOut } from '../redux/user-slice';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

type Props = {
	children?: ReactChild | ReactChild[];
};

const Header = (props: Props): JSX.Element => {
	const history = useHistory();
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(logOut());
		localStorage.removeItem('token');
		history.push('/');
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.title}>
					<img src={logo} alt='PartyPlanner.io' />
				</div>
				<div className={styles.headerButtons}>
					{props.children}
					<button className={styles.logoutButton} onClick={logout}>
						log out
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
