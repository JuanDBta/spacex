import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRockets } from '../redux/rockets/rocketsSlice';

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
    <div className="rockets-container">
      {rockets.map((rocket) => (
        <div key={rocket.id} className="rocket-item">
          <img src={rocket.flickr_images?.[0]} alt={rocket.rocket_name} />
          <div className="rocket-content">
            <h4 className="rocket-name">{rocket.rocket_name}</h4>
            <p className="rocket-description">{rocket.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
