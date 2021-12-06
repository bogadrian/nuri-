import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import './dataTable.scss';

import { useQuery } from 'react-query';

import { IBlock } from '../../custom-types';

import { useTable, usePagination } from 'react-table';
import { Spinner } from '../Spinner';
import { fetchData } from '../../utils/fetchData';
import { COLUMNS } from './columns';

const baseUrl = process.env.REACT_APP_BASE_URL!;

interface Props {
  data: IBlock[];
}
const DataTable: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);
  const dataTable = useMemo(() => data, [data]);

  const tableInstance = useTable(
    {
      columns,
      data: dataTable
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <>
      <div className="info" data-testid="dataTable">
        <span className="info-text">Today Blockchain's Info:</span>
      </div>
      <div className="table-data-container">
        <table {...getTableProps()} className="table-data">
          <thead>
            {headerGroups.map((headerGroup: any, i: number) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, i: number) => (
                  <th key={i} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell: any, i: number) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        onClick={() => {
                          const { value } = cell;
                          console.log('value, value', value);
                          console.log(cell);
                          navigate(`/${value}`);
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table-pagination">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="table-pagination-button"
            style={{ marginRight: '0.5rem' }}
          >
            {' << '}
          </button>
          <button
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
            className="table-pagination-button"
          >
            Prev
          </button>
          <span className="table-pagination-page">
            {pageIndex + 1} of {pageOptions.length}
          </span>
          <button
            disabled={!canNextPage}
            onClick={() => nextPage()}
            className="table-pagination-button"
            style={{ marginLeft: '.5rem' }}
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="table-pagination-button"
            style={{ marginLeft: '0.5rem' }}
          >
            {' >> '}
          </button>
        </div>
      </div>
    </>
  );
};

const DataTableWrapper = () => {
  const { isLoading, data, isError, error } = useQuery(['data', baseUrl], () =>
    fetchData(baseUrl)
  );

  if (isError) {
    return <div className="error">{(error as any).message}</div>;
  }

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    );
  }
  return <DataTable data={data} />;
};

export default DataTableWrapper;
