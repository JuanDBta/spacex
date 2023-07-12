import React from 'react';
import styles from '../style/Profile.module.css';

function Profile() {
  return (
    <section className={styles.profilecontainer}>

      <div className={styles.missions}>
        <h2 className={styles.missionstitle}>My Missions</h2>
        <ul className={styles.missionslist}>
          <li className={styles.launchmission}>Telstar</li>
          <li className={styles.launchmission}>SES</li>
          <li className={styles.launchmission}>AsiaSat</li>
          <li className={styles.launchmission}>ABS</li>
        </ul>
      </div>

      <div className={styles.rockets}>
        <h2 className={styles.rocketstitle}>My Rockets</h2>
        <ul className={styles.rocketslist}>
          <li className={styles.reservedrocket}>Falcon 9</li>
          <li className={styles.reservedrocket}>Falcon Heavy</li>
          <li className={styles.reservedrocket}>Starship</li>
        </ul>
      </div>

    </section>
  );
}
export default Profile;
