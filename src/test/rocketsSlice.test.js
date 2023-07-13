import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import rocketsReducer, {
  getRockets,
  reserveRocket,
  cancelRocketReservation,
} from '../redux/rockets/rocketsSlice';

const mockStore = configureStore([thunk]);

describe('rocketsSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rockets: [
        {
          id: 'example-id-1',
          rocket_name: 'Rocket 1',
          description: 'Rocket 1 description',
          flickr_images: ['image1.jpg'],
          reserved: false,
        },
        {
          id: 'example-id-2',
          rocket_name: 'Rocket 2',
          description: 'Rocket 2 description',
          flickr_images: ['image2.jpg'],
          reserved: false,
        },
        // ... Agregar más objetos de rockets si es necesario
      ],
      isLoading: false,
      error: null,
    });
  });

  describe('reducer', () => {
    it('should have the initial rockets array with preexisting data', () => {
      const initialState = rocketsReducer(undefined, {});
      const expectedInitialState = {
        rockets: [
          {
            id: 'example-id-1',
            rocket_name: 'Rocket 1',
            description: 'Rocket 1 description',
            flickr_images: ['image1.jpg'],
            reserved: false,
          },
          {
            id: 'example-id-2',
            rocket_name: 'Rocket 2',
            description: 'Rocket 2 description',
            flickr_images: ['image2.jpg'],
            reserved: false,
          },
          // ... Agregar más objetos de rockets si es necesario
        ],
        isLoading: false,
        error: null,
      };
      expect(initialState).toEqual(expectedInitialState);
    });

    // Resto de las pruebas del reducer
  });

  describe('getRockets', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([
          {
            id: 'rocket1',
            rocket_name: 'Rocket 1',
            description: 'Rocket 1 Description',
            flickr_images: [],
            reserved: false,
          },
          {
            id: 'rocket2',
            rocket_name: 'Rocket 2',
            description: 'Rocket 2 Description',
            flickr_images: [],
            reserved: false,
          },
        ]),
      });
    });

    it('should fetch rockets and update state on successful response', async () => {
      await store.dispatch(getRockets());

      const actions = store.getActions();
      expect(actions[0].type).toEqual(getRockets.pending.type);
      expect(actions[1].type).toEqual(getRockets.fulfilled.type);
      expect(actions[1].payload).toEqual([
        {
          id: 'rocket1',
          rocket_name: 'Rocket 1',
          description: 'Rocket 1 Description',
          flickr_images: [],
          reserved: false,
        },
        {
          id: 'rocket2',
          rocket_name: 'Rocket 2',
          description: 'Rocket 2 Description',
          flickr_images: [],
          reserved: false,
        },
      ]);
    });

    it('should handle error on failed response', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await store.dispatch(getRockets());

      const actions = store.getActions();
      expect(actions[0].type).toEqual(getRockets.pending.type);
      expect(actions[1].type).toEqual(getRockets.rejected.type);
      expect(actions[1].error.message).toEqual('Failed to fetch rockets');
    });
  });

  describe('reserveRocket', () => {
    it('should reserve a rocket and update state', async () => {
      const rocketId = 'example-id-1';

      await store.dispatch(reserveRocket(rocketId));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(reserveRocket.pending.type);
      expect(actions[1].type).toEqual(reserveRocket.fulfilled.type);
      expect(actions[1].payload).toEqual(rocketId);

      const updatedState = rocketsReducer(store.getState(), actions[1]);
      const reservedRocket = updatedState.rockets.find((rocket) => rocket.id === rocketId);
      expect(reservedRocket.reserved).toBe(true);
    });
  });

  describe('cancelRocketReservation', () => {
    it('should cancel a rocket reservation and update state', async () => {
      const rocketId = 'example-id-1';

      await store.dispatch(cancelRocketReservation(rocketId));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(cancelRocketReservation.pending.type);
      expect(actions[1].type).toEqual(cancelRocketReservation.fulfilled.type);
      expect(actions[1].payload).toEqual(rocketId);

      const updatedState = rocketsReducer(store.getState(), actions[1]);
      const canceledRocket = updatedState.rockets.find((rocket) => rocket.id === rocketId);
      expect(canceledRocket.reserved).toBe(false);
    });
  });
});
