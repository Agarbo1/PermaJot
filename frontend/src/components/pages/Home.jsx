// src/pages/Home.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Home.css';

export default function Home() {
  const sessionUser = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  if (sessionUser) {
    return <Navigate to="/dashboard" />;
  }

  const openLogin = () => {
    console.log('Opening login modal');
    setModalContent(<LoginFormModal />);
  };
  const openSignup = () => setModalContent(<SignupFormModal />);

  return (
    <div className="home-page">
      <h1>Welcome to PermaJot</h1>
      <p>
        Please{' '}
        <button onClick={openLogin} className="home-button-link">
          Log In
        </button>{' '}
        or{' '}
        <button onClick={openSignup} className="home-button-link">
          Sign Up
        </button>{' '}
        to continue.
      </p>
    </div>
  );
}
