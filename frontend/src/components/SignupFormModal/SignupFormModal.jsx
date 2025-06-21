import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import CTAButton from '../CTAButton';
import CancelButton from '../CancelButton';

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const minUserChars = 4;
  const minPassChars = 6;

  const isButtonDisabled =
    !email ||
    !username ||
    !password ||
    !confirmPassword ||
    username.length < minUserChars ||
    password.length < minPassChars;

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
    showBtn: {
      alignSelf: 'flex-end',
      fontSize: '0.85rem',
      marginTop: '0.25rem',
      background: 'none',
      color: '#2f80ed',
      border: 'none',
      cursor: 'pointer',
    },
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(sessionActions.signup({ email, username, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          console.error(data)
          if (data?.errors) setErrors(data.errors);
        });
    }
    setErrors({
      confirmPassword: 'Confirm Password field must match Password',
    });
  };

  return (
      <div style={styles.modalBox}>
        <div style={styles.container}>
          <h1 style={styles.title}>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputContainer}>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              {errors.email && <p style={styles.error}>{errors.email}</p>}
            </div>

            <div style={styles.inputContainer}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
              />
              {errors.username && <p style={styles.error}>{errors.username}</p>}
            </div>

            <div style={styles.inputContainer}>
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                style={styles.showBtn}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <p style={styles.error}>{errors.password}</p>}
            </div>

            <div style={styles.inputContainer}>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={styles.input}
              />
              {errors.confirmPassword && (
                <p style={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>

            <CTAButton type="submit" disabled={isButtonDisabled}>
              Sign Up
            </CTAButton>
            <CancelButton />
          </form>
        </div>
      </div>
  );
}

export default SignupFormModal;
