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
      <h1>Rockets</h1>
      {rockets.map((rocket) => (
        <div key={rocket.id}>
          <h2>{rocket.rocket_name}</h2>
          <p>{rocket.description}</p>
          <img src={rocket.flickr_images?.[0]} alt={rocket.rocket_name} />
        </div>
      ))}
    </div>
  );
};

export default Rockets;
