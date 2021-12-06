import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';
import { QueryClientProvider, QueryClient } from 'react-query';

import { MemoryRouter } from 'react-router-dom';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

test('renders DataTable', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <DataTable />
      </MemoryRouter>
    </QueryClientProvider>
  );
  const dataTable = screen.queryByTestId('dataTable');
  expect(dataTable).not.toBeInTheDocument();
});
