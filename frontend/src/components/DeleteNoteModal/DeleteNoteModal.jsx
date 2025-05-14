import { useDispatch } from 'react-redux';
import { deleteNote } from '../../store/notes';
import '../Modal.css'; // shared styling if desired

const DeleteNoteModal = ({ noteId, closeModal }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteNote(noteId));
    closeModal();
  };

  return (
    <div className="modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this note? This action cannot be undone. (Guess that takes the "Perma" out of "PermaJot," huh?)</p>
      <div className="modal-buttons">
        <button onClick={handleDelete} className="delete-btn">Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteNoteModal;
