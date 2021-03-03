import * as React from "react";
import styles from "./Landing.module.scss";
import LandingHeader from "./LandingHeader";
import img from "../img/landingImage.svg" ;

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <LandingHeader />
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
      </div>
    );
  }
}
