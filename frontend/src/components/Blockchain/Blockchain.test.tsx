import { render, screen } from '@testing-library/react';
import { Blockchain } from './Blockchain';
import { QueryClientProvider, QueryClient } from 'react-query';

import { MemoryRouter } from 'react-router-dom';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

test('renders Blockchain', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Blockchain />
      </MemoryRouter>
    </QueryClientProvider>
  );
  const dataTable = screen.queryByText('Go Back');
  expect(dataTable).not.toBeInTheDocument();
});
