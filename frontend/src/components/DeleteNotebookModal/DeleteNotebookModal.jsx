import { useDispatch } from 'react-redux';
import { deleteNotebook } from '../../store/notebooks';
import '../Modal.css'; // optional for styling

const DeleteNotebookModal = ({ notebookId, closeModal }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteNotebook(notebookId));
    closeModal();
  };

  return (
    <div className="modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this notebook? This action cannot be undone.</p>
      <div className="modal-buttons">
        <button onClick={handleDelete} className="delete-btn">Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteNotebookModal;
