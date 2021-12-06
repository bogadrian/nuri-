import { screen, render } from '@testing-library/react';
import { Component404 } from './Component404';

import { MemoryRouter } from 'react-router-dom';

describe('Component404', () => {
  test('renders Component404', () => {
    render(
      <MemoryRouter>
        <Component404 />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 | Page Not Found !/)).toBeInTheDocument();
  });
});
