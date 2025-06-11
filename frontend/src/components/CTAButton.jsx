import { useState } from 'react';

export default function CTAButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary'
  style = {},
}) {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    border: 'none',
    borderRadius: '20px',
    padding: '0.5rem 1.25rem',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    margin: '0 0.5rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    ...style,
  };

  const primary = {
    backgroundColor: hovered ? '#1366d6' : '#2f80ed',
    color: '#ffffff',
  };

const secondary = {
  backgroundColor: hovered ? '#cfcfcf' : '#e0e0e0', // darker gray on hover
  color: '#2f80ed',
};

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...baseStyle,
        ...(variant === 'primary' ? primary : secondary),
      }}
    >
      {children}
    </button>
  );
}
