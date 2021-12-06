import { useNavigate } from 'react-router-dom';
import './component404.scss';

interface Props {
  message?: string;
}

export const Component404: React.FC<Props> = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="container404">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div className="container404-text">
        {message ? message : '404 | Page Not Found !'}
      </div>
    </div>
  );
};
