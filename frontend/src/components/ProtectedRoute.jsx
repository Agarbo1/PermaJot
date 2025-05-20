import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from './Loading/Loading';

export default function ProtectedRoute({ isLoaded, children }) {
  const user = useSelector(state => state.session.user);
  console.log("🔒 ProtectedRoute mounted, isLoaded =", isLoaded);

  if (!isLoaded) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

