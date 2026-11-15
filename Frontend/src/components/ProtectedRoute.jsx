import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
  const { session, role } = useAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard'} replace />;
  }

  return children;
}