import { useNavigationType, Navigate } from 'react-router-dom';
import Predicciones from './Predicciones';

export default function PrediccionesGuard() {
  const navType = useNavigationType();

  return navType === 'POP'
    ? <Navigate to="/dashboard" replace />
    : <Predicciones />;
}
