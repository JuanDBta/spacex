import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import {
  fetchmissions, getError, getLoading, getMissions,
} from '../redux/missions/missionSlice';
import '../style/mission.css';

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
    <div className="tableDiv">
      <table>
        <thead className="header">
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
              <td key={mission.mission_id} className="mission-name">{mission.name}</td>
              <td key={mission.mission_id} className="description">{mission.description}</td>
              <td key={mission.mission_id}>

                {mission.reserved === false
                  ? <span className="notmemebr">Not A MEMBER</span> : <span className="memeber">ACTIVE MEMBER</span>}
              </td>
              <td key={mission.mission_id}>
                {mission.reserved === false ? (
                  <button type="button" className="join">JOIN MISSION</button>
                ) : (
                  <button type="button" className="leave">LEAVE MISSION</button>
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
