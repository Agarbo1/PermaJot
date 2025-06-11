import { useModal } from '../context/Modal';
import { useState } from 'react';

export default function CancelButton({ children = 'Cancel', style = {} }) {
  const { closeModal } = useModal();
  const [hover, setHover] = useState(false);

  const baseStyle = {
    backgroundColor: hover ? '#fdd' : '#fff',
    border: '1px solid #f44336',
    color: '#f44336',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.2s ease',
    ...style,
  };

  return (
    <button
      onClick={closeModal}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseStyle}
    >
      {children}
    </button>
  );
}
