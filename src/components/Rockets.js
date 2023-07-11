import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRockets } from '../redux/rockets/rocketsSlice';
import styles from '../style/Rockets.module.css';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const isLoading = useSelector((state) => state.rockets.isLoading);

  useEffect(() => {
    dispatch(getRockets());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.rockets}>
      {rockets.map((rocket) => (
        <div key={rocket.id} className={styles.item}>
          <img src={rocket.flickr_images?.[0]} className={styles.image} width="150px" alt={rocket.rocket_name} />
          <div className={styles.content}>
            <h4 className={styles.name}>{rocket.rocket_name}</h4>
            <p className={styles.description}>{rocket.description}</p>
            <button type="submit" className={styles.reserve}>Reserve Rocket</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
