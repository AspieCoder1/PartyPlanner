import * as React from 'react';
import styles from './LandingHeader.module.scss';

type IProps = {
  onClickLogin: () => void;
}

export default class LandingHeader extends React.Component<IProps> {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>PartyPlanner.io</h1>
          <div className={styles.headerButtons}>
            <button onClick={this.props.onClickLogin} className={styles.loginButton}>Login</button>
            <button onClick={() => {console.log("Register button")}} className={styles.registerButton}>Register</button>
          </div>
        </div>
      </header>
    );
  }
}
