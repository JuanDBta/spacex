import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Rockets from '../components/Rockets';

const mockStore = configureStore([thunk]);

describe('Rockets', () => {
  test('renders rocket name', async () => {
    const store = mockStore({
      rockets: {
        rockets: [
          {
            id: '1',
            rocket_name: 'Falcon 9',
            description: 'Sample description',
            reserved: false,
          },
        ],
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Rockets />
      </Provider>
    );

    const rocketName = screen.queryByText('Falcon 9');
    expect(rocketName).toBeTruthy();
  });
});
