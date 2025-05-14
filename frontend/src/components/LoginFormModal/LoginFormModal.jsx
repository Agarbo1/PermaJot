import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/session';
import '../Modal.css'; // Optional: your shared modal styles

const LoginFormModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const res = await dispatch(login({ credential, password }));

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = async () => {
    const res = await dispatch(login({ credential: 'demo@user.io', password: 'password' }));

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
      navigate('/dashboard');
    }
  };

  return (
    <div className="modal">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error">{errors.credential}</p>}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="modal-buttons">
          <button type="submit" className="submit-btn">Log In</button>
          <button type="button" onClick={handleDemoLogin}>Demo User</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default LoginFormModal;
