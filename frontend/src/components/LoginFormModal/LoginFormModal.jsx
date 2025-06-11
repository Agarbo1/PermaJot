import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';
import CTAButton from '../CTAButton';
import CancelButton from '../CancelButton';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const minUserChars = 4;
  const minPassChars = 6;

  const isButtonDisabled =
    credential.length < minUserChars || password.length < minPassChars;

  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalBox: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      fontFamily: 'system-ui, sans-serif',
    },
    container: {
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxWidth: '400px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
    },
    title: {
      fontSize: '1.75rem',
      marginBottom: '1.5rem',
      color: '#333',
      textAlign: 'center',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '1rem',
    },
    input: {
      padding: '0.5rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    error: {
      color: 'red',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
    },
    buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '1.5rem',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      });
  };

  const handleDemoLogin = () => {
    return dispatch(
      sessionActions.login({ credential: 'Demo-lition', password: 'password' })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      });
  };

  return (
      <div style={styles.modalBox}>
        <div style={styles.container}>
          <h1 style={styles.title}>Log In</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="Username or Email"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={styles.input}
              />
            </div>
            {errors.credential && (
              <p style={styles.error}>{errors.credential}</p>
            )}
            <div style={styles.buttonRow}>
              <CTAButton type="submit" disabled={isButtonDisabled}>
               Log In
            </CTAButton>
            <CTAButton variant="secondary" onClick={handleDemoLogin}>
              Demo Login
            </CTAButton>
            <CancelButton />
          </div>
        </form>
        </div>
      </div>
  );
}

export default LoginFormModal;
