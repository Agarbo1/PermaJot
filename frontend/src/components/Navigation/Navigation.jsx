// src/components/Navigation/Navigation.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './Navigation.css';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setModalContent } = useModal();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const openLoginModal = () => setModalContent(<LoginFormModal />);
  const openSignupModal = () => setModalContent(<SignupFormModal />);

  return (
    <nav className="nav-container">
      <NavLink to="/dashboard" className="nav-logo">
        <img src="/notebook-svgrepo-com.svg" alt="PermaJot" />
        <span>PermaJot</span>
      </NavLink>

      <button className="nav-toggle" onClick={() => setMenuOpen(prev => !prev)}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <div className="nav-dropdown">
              <button onClick={() => setDropdownOpen(prev => !prev)}>
                {user.username} ▼
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <NavLink to="/profile">Profile</NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button onClick={openLoginModal}>Log In</button>
            <button onClick={openSignupModal}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}
