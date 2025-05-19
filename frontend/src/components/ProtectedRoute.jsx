// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading  from './Loading/Loading';

export default function ProtectedRoute({ children }) {
  const user = useSelector(state => state.session.user);
  const isLoaded = useSelector(state => state.session.isLoaded);

  if (!isLoaded) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
