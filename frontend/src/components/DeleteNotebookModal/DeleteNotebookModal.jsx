import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as notebookActions from '../../store/notebooks';
import '../Modal.css'; // optional for styling
// const { closeModal } = useModal();

const DeleteNotebookModal = ({ notebookId, closeModal }) => {
  const dispatch = useDispatch();

  const handleDeleteNotebook = () => {
    dispatch(notebookActions.deleteNotebook(notebookId))
      .then(() => {
        dispatch(notebookActions.fetchNotebooks());
        closeModal();
        alert('Notebook deleted successfully');
      })
      .catch((error) => {
        console.error('Failed to delete notebook:', error);
        alert('Failed to delete notebook. Please try again.');
      });
  };

  return (
    <div data-testid="delete-notebook-modal">
      <h1>Confirm Delete</h1>
      <p>This action is permanent. Are You Sure You Want to Delete this Notebook and all it&apos;s associated notes?</p>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}
      >
        <button
          onClick={handleDeleteNotebook}
          className="site-btn primary"
          style={{ backgroundColor: "red" }}
          data-testid="confirm-delete-spot-button"
        >
          Yes (Delete Notebook)
        </button>
        <button
          onClick={closeModal}
          className="site-btn secondary"
          style={{
            width: "100%",
            maxWidth: "100%",
            backgroundColor: "gray",
            color: "white",
            border: "none"
          }}
          data-testid="cancel-delete-Notebook-button"
        >
          No (Keep Notebook)
        </button>
      </div>
    </div>
  );
};

export default DeleteNotebookModal;
