import * as React from 'react';
import styles from './LandingHeader.module.scss';
import logo from '../../img/partyplanner.png';

type IProps = {
	onClickLogin: () => void;
	onClickRegister: () => void;
};

export default class LandingHeader extends React.Component<IProps, never> {
	render(): React.ReactNode {
		return (
			<header className={styles.header}>
				<div className={styles.container}>
					<div className={styles.title}>
						<img src={logo} alt='PartyPlanner.io' />
					</div>
					<div className={styles.headerButtons}>
						<button onClick={this.props.onClickLogin} className={styles.loginButton}>
							Login
						</button>
						<button onClick={this.props.onClickRegister} className={styles.registerButton}>
							Register
						</button>
					</div>
				</div>
			</header>
		);
	}
}
