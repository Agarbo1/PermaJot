// src/components/Modal.jsx
import { useModal } from '../context/Modal';

export function Modal() {
  const { modalContent, closeModal } = useModal();

  if (!modalContent) return null;

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  );
}
