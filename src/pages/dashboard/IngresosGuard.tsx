import { useNavigationType, Navigate } from 'react-router-dom';
import Ingresos from './Ingresos';

export default function IngresosGuard() {
  const navType = useNavigationType();

  return navType === 'POP'
    ? <Navigate to="/dashboard" replace />
    : <Ingresos />;
}
