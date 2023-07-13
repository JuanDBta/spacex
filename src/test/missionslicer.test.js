import missionReducer, { fetchmissions, joinmission, leavemission } from '../redux/missions/missionSlice';

describe('missionSlice', () => {
  describe('reducer', () => {
    it('should have an empty missions array in the initial state', () => {
      const initialState = missionReducer(undefined, {});
      expect(initialState.missions).toEqual([]);
    });

    it('should populate the missions array with data after fetchmissions() is dispatched', () => {
      const missions = [{
        id: '9D1B7E0', name: 'Thaicom', description: '', reserved: false,
      }];
      const action = { type: fetchmissions.fulfilled.type, payload: missions };
      const newState = missionReducer(undefined, action);
      expect(newState.missions).toEqual(missions);
    });
  });

  it('should update the reserved property of a mission after joinmission() is dispatched', () => {
    const initialState = {
      missions: [{
        id: '9D1B7E0', name: 'Thaicom', description: '', reserved: false,
      }],
    };
    const action = { type: joinmission.fulfilled.type, payload: '9D1B7E0' };
    const newState = missionReducer(initialState, action);
    const updatedMission = newState.missions.find((mission) => mission.id === '9D1B7E0');
    expect(updatedMission.reserved).toEqual(true);
  });
  it('should update the reserved property of a mission after leavemission() is dispatched', () => {
    const initialState = {
      missions: [{
        id: '9D1B7E0', name: 'Thaicom', description: '', reserved: true,
      }],
    };
    const action = { type: leavemission.fulfilled.type, payload: '9D1B7E0' };
    const newState = missionReducer(initialState, action);
    const updatedMission = newState.missions.find((mission) => mission.id === '9D1B7E0');
    expect(updatedMission.reserved).toEqual(false);
  });
});
jest.setTimeout(10000);
