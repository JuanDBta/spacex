import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Mission from '../components/Mission';
import '@testing-library/jest-dom';

const mockStore = configureStore([thunk]);

describe('Mission component', () => {
  it('renders loading message when missions are being fetched', async () => {
    const store = mockStore({
      missions: {
        missions: [],
        isloading: true,
        error: '',
      },
    });

    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Loading....')).toBeInTheDocument();
    });
  });

  it('renders error message when missions fetch fails', async () => {
    const store = mockStore({
      missions: {
        missions: [],
        isloading: false,
        error: 'Failed to fetch missions',
      },
    });

    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    expect(screen.getByText('error fetching data')).toBeInTheDocument();
  });

  it('renders mission data when missions have been fetched', async () => {
    const store = mockStore({
      missions: {
        missions: [
          {
            id: '1', name: 'Mission 1', description: 'Description 1', reserved: true,
          },
          {
            id: '2', name: 'Mission 2', description: 'Description 2', reserved: false,
          },
        ],
        loading: false,
        error: '',
      },
    });

    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Mission')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Take action')).toBeInTheDocument();

      expect(screen.getByText('Mission 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('ACTIVE MEMBER')).toBeInTheDocument();
      expect(screen.getByText('LEAVE MISSION')).toBeInTheDocument();

      expect(screen.getByText('Mission 2')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
      expect(screen.getByText('Not A MEMBER')).toBeInTheDocument();
      expect(screen.getByText('JOIN MISSION')).toBeInTheDocument();
    });
  });
});
