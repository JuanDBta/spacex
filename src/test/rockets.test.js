import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Rockets from '../components/Rockets';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('Rockets', () => {
  test('renders rocket name', () => {
    const store = mockStore({
      rockets: {
        rockets: [
          {
            id: '1',
            rocket_name: 'Falcon 9',
            description: 'Sample description',
            isReserved: false,
          },
        ],
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const rocketName = screen.queryByText('Falcon 9');
    expect(rocketName).toBeTruthy();
  });

  test('renders loading message when rockets are being fetched', () => {
    const store = mockStore({
      rockets: {
        rockets: [],
        isLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeTruthy();
  });

  test('renders rocket data when rockets have been fetched', () => {
    const store = mockStore({
      rockets: {
        rockets: [
          {
            id: '1',
            rocket_name: 'Falcon 1',
            description: 'Description 1',
            isReserved: true,
          },
          {
            id: '2',
            rocket_name: 'Falcon 9',
            description: 'Description 2',
            isReserved: false,
          },
        ],
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const rocket1Name = screen.getByText('Falcon 1');
    const rocket1Description = screen.getByText('Description 1');
    const rocket1Reserved = screen.getByText('Reserved');
    const rocket1CancelButton = screen.getByText('Cancel Reservation');

    const rocket2Name = screen.getByText('Falcon 9');
    const rocket2Description = screen.getByText('Description 2');
    const rocket2ReserveButton = screen.getByText('Reserve Rocket');

    expect(rocket1Name).toBeTruthy();
    expect(rocket1Description).toBeTruthy();
    expect(rocket1Reserved).toBeTruthy();
    expect(rocket1CancelButton).toBeTruthy();

    expect(rocket2Name).toBeTruthy();
    expect(rocket2Description).toBeTruthy();
    expect(rocket2ReserveButton).toBeTruthy();
  });
});
