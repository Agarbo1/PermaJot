// src/pages/Home.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="home-page">
      <h1>Welcome to PermaJot</h1>
      <p>Please log in or sign up to continue.</p>
    </div>
  );
}
