import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import './blockchain.scss';

import { Spinner } from '../Spinner';
import { fetchData } from '../../utils/fetchData';

const baseUrl = process.env.REACT_APP_BASE_URL!;

export const Blockchain: React.FC = () => {
  const navigate = useNavigate();
  const { blockchain } = useParams();
  console.log(blockchain);
  const url = `${baseUrl}/${blockchain}`;

  const { isLoading, data, isError, error } = useQuery(['dataBlock', url], () =>
    fetchData(url)
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

  return (
    <div className="rawData-container">
      <button onClick={() => navigate(-1)} className="rawData-container-button">
        Go Back
      </button>
      <ul className="rawData-container-main">
        {data &&
          Object.entries(data).map((elm, i) => {
            const [key, description] = elm;

            return (
              <div key={i} className="list">
                <span className="list-key">{key !== 'tx' && key + ':'}</span>
                <span className="list-description">
                  {typeof description === 'string' ||
                  typeof description === 'number'
                    ? description
                    : typeof description === 'boolean'
                    ? description.toString()
                    : typeof description === 'object' &&
                      Array.isArray(description) &&
                      (typeof description[0] === 'string' ||
                        typeof description[0] === 'number')
                    ? description[0]
                    : ''}
                </span>
              </div>
            );
          })}
      </ul>
      <button onClick={() => navigate(-1)} className="rawData-container-button">
        Go Back
      </button>
      <Outlet />
    </div>
  );
};
