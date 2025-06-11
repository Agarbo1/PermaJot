import { useModal } from '../context/Modal';

export function Modal() {
  const { modalContent, closeModal } = useModal();

  if (!modalContent) return null;

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0, // shorthand for top: 0, right: 0, bottom: 0, left: 0
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxSizing: 'border-box',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    fontFamily: 'system-ui, sans-serif',
  },
};



  return (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.content} onClick={(e) => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  );
}
