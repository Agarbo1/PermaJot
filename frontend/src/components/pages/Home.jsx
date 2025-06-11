// src/pages/Home.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import CTAButton from '../CTAButton';

export default function Home() {
  const sessionUser = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  if (sessionUser) return <Navigate to="/dashboard" />;

  const openLogin = () => setModalContent(<LoginFormModal />);
  const openSignup = () => setModalContent(<SignupFormModal />);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundImage:
        'url("https://cdn.stocksnap.io/img-thumbs/960w/notepad-notebook_UND64HFL0B.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      color: '#333',
      backdropFilter: 'blur(2px)', // optional
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    header: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    paragraph: {
      fontSize: '1.2rem',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.header}>Welcome to PermaJot</h1>
        <p style={styles.paragraph}>
          Please
          <CTAButton onClick={openLogin}>Log In</CTAButton>
          or
          <CTAButton onClick={openSignup} variant="secondary">
            Sign Up
          </CTAButton>
          to continue.
        </p>
      </div>
    </div>
  );
}
