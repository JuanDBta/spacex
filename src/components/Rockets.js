import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRockets, reserveRocket } from '../redux/rockets/rocketsSlice';
import styles from '../style/Rockets.module.css';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const isLoading = useSelector((state) => state.rockets.isLoading);
  const [reservedRocketIds, setReservedRocketIds] = useState([]);

  useEffect(() => {
    dispatch(getRockets());
  }, [dispatch]);

  const handleReserveRocket = (rocketId) => {
    if (reservedRocketIds.includes(rocketId)) {
      setReservedRocketIds(reservedRocketIds.filter((id) => id !== rocketId));
    } else {
      dispatch(reserveRocket(rocketId));
      setReservedRocketIds([...reservedRocketIds, rocketId]);
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
              {reservedRocketIds.includes(rocket.id) && (
                <button type="button" className={styles.reserved}>Reserved</button>
              )}
              {rocket.description}
            </p>
            <button
              type="button"
              className={styles.reserve}
              onClick={() => handleReserveRocket(rocket.id)}
              disabled={rocket.reserved || reservedRocketIds.includes(rocket.id)}
              style={reservedRocketIds.includes(rocket.id) ? { backgroundColor: 'white', color: 'rgb(184, 175, 175)', border: '1px rgb(184, 175, 175) solid' } : null}
            >
              {reservedRocketIds.includes(rocket.id) ? 'Cancel Reservation' : 'Reserve Rocket'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
