import * as React from 'react';
import styles from './LandingHeader.module.scss';

export default class LandingHeader extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>PartyPlanner.io</h1>
          <div className={styles.headerButtons}>
            <button onClick={() => {console.log("Login button")}} className={styles.loginButton}>Login</button>
            <button onClick={() => {console.log("Register button")}} className={styles.registerButton}>Register</button>
          </div>
        </div>
      </header>
    );
  }
}
