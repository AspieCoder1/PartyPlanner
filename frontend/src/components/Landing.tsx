import * as React from "react";
import styles from "./Landing.module.scss";
import LandingHeader from "./LandingHeader";
import img from "../img/landingImage.svg" ;
import ReactModal from 'react-modal';
import { LoginForm } from "./LoginForm";

type IState = {
  loginModalOpen: boolean;
}

export default class Landing extends React.Component<any, IState> {

  onLoginModelClose = () => {
    this.setState({loginModalOpen: false})
  }

  openLoginModel = () => {
    this.setState({loginModalOpen: true})
  }

  state: IState = {
    loginModalOpen: false
  }

  render() {
    return (
      <div>
        <LandingHeader onClickLogin={this.openLoginModel} />
        <div className={styles.container}>
          <h2 className={styles.title}>
            Take the stress out of party planning
          </h2>
          <p className={styles.paragraph}>
            We all know party planning is hard. But it does not have to be.
            PartyPlanner.io provides you with all the tools you need in order to
            have a stress-free party. So relax, get a drink and give
            PartyPlanner a try!
          </p>
          <button className={styles.button}>Get PartyPlanner</button>
          <img className={styles.img} src={img} alt="" />
        </div>
        {/*TODO: add styling to ReactModal to make it smaller and fit better*/}
        <ReactModal overlayClassName={styles.overlay} className={styles.modal} isOpen={this.state.loginModalOpen}>
          <LoginForm  closeModal={this.onLoginModelClose}/>
        </ReactModal>
      </div>
    );
  }
}
