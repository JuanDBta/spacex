import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import Profile from '../components/Profile';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('Profile component', () => {
  it('renders reserved rockets and missions', () => {
    const store = mockStore({
      rockets: {
        rockets: [
          { id: '1', rocket_name: 'Falcon 1', isReserved: true },
          { id: '2', rocket_name: 'Falcon 9', isReserved: false },
        ],
      },
      missions: {
        missions: [
          { id: '1', name: 'Mission 1', reserved: true },
          { id: '2', name: 'Mission 2', reserved: false },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 1')).toBeInTheDocument();
  });
});
