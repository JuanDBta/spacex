import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import {
  fetchmissions, getError, getLoading, getMissions,
} from '../redux/missions/missionSlice';

function Mission() {
  const dispatch = useDispatch();
  const missions = useSelector(getMissions);
  const missionLoading = useSelector(getLoading);
  const missionError = useSelector(getError);

  useEffect(() => {
    dispatch(fetchmissions());
  }, [dispatch]);
  // memoize the missions data and use it to render the component on every navigation change.
  const memoizedMissions = useMemo(() => missions, [missions]);
  if (missionLoading === true) {
    return <div>Loading..</div>;
  }
  if (missionError !== '') {
    return <div>error fetching data</div>;
  }
  return (
    <div>
     

    </div>
  );
}
export default Mission;
