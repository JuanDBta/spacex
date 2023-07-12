import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../style/Profile.module.css';

function Profile() {
  const rockets = useSelector((state) => state.rockets.rockets);

  const reservedRockets = rockets.filter((rocket) => rocket.reserved);

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
          {reservedRockets.map((rocket) => (
            <li key={rocket.id} className={styles.reservedrocket}>
              {rocket.rocket_name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Profile;
