import React from 'react';
import { useSelector } from 'react-redux';
import {
  getMissions,
} from '../redux/missions/missionSlice';

import styles from '../style/Profile.module.css';

function Profile() {
  const rockets = useSelector((state) => state.rockets.rockets);

  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  const missions = useSelector(getMissions);
  const reservedMissions = missions.filter((mission) => mission.reserved);
  return (
    <section className={styles.profilecontainer}>
      <div className={styles.missions}>
        <h2 className={styles.missionstitle}>My Missions</h2>
        <ul className={styles.missionslist}>
          {reservedMissions.map((mission) => (
            <li key={mission.id} className={styles.reservedrocket}>
              {mission.name}
            </li>
          ))}
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
