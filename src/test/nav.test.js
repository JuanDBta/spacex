import { render } from '@testing-library/react';
import {
  MemoryRouter, Routes, Route,
} from 'react-router-dom';
import NAVBAR from '../components/Navbar';

describe('test navabar', () => {
  test('it should match the snapshoot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/Navbar']}>
        <Routes>
          <Route path="/Navbar" element={<NAVBAR />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
