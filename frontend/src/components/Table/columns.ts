export const COLUMNS: any = [
  {
    Header: 'Hash',
    accessor: 'hash',
    Cell: ({ value }: any) => {
      return value;
    }
  },
  {
    Header: 'Height',
    accessor: 'height',
    Cell: ({ value }: any) => {
      return value;
    }
  },
  {
    Header: 'Block Index',
    accessor: 'block_index',
    Cell: ({ value }: any) => {
      return value;
    }
  }
];
