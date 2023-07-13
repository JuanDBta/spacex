import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRockets, reserveRocket, cancelReservation } from '../redux/rockets/rocketsSlice';
import styles from '../style/Rockets.module.css';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const isLoading = useSelector((state) => state.rockets.isLoading);

  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(getRockets());
    }
  }, [dispatch, rockets.length]);

  const handleReserveRocket = (rocketId, reserved) => {
    if (reserved) {
      dispatch(cancelReservation(rocketId));
    } else {
      dispatch(reserveRocket(rocketId));
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.rockets}>
      {rockets.map((rocket) => (
        <div key={rocket.id} className={styles.item}>
          <img src={rocket.flickr_images?.[0]} className={styles.image} width="150px" alt={rocket.rocket_name} />
          <div className={styles.content}>
            <h4 className={styles.name}>{rocket.rocket_name}</h4>
            <p className={styles.description}>
              {rocket.isReserved && (
                <button type="button" className={styles.rocketreserved}>Reserved</button>
              )}
              {rocket.description}
            </p>
            {rocket.isReserved && (
              <button
                type="button"
                className={styles.cancelled}
                onClick={() => handleReserveRocket(rocket.id, rocket.isReserved)}
              >
                Cancel Reservation
              </button>
            )}
            {!rocket.isReserved && (
              <button
                type="button"
                className={styles.reserve}
                onClick={() => handleReserveRocket(rocket.id, rocket.isReserved)}
              >
                Reserve Rocket
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
