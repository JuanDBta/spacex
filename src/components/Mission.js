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
      <table>
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th>Take action</th>
          </tr>
        </thead>
        <tbody>
          {memoizedMissions.map((mission) => (
            <tr key={mission.id}>
              <td key={mission.mission_id}>{mission.name}</td>
              <td key={mission.mission_id}>{mission.description}</td>
              <td key={mission.mission_id}>
                {mission.reserved === false ? 'Not A MEMBER' : 'ACTIVE MEMBER'}
              </td>
              <td key={mission.mission_id}>
                {mission.reserved === false ? (
                  <button type="button">Join Mission</button>
                ) : (
                  <button type="button">Leave Mission</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
export default Mission;
