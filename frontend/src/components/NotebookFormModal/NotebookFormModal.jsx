import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNotebook, editNotebook } from '../../store/notebooks'; // adjust if you use thunks/actions differently
import './NotebookFormModal.css';

const NotebookFormModal = ({ notebook = null, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(notebook?.title || '');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrors(['Title is required']);
      return;
    }

    const payload = { title: title.trim() };
    try {
      if (notebook) {
        await dispatch(editNotebook({ id: notebook.id, ...payload }));
      } else {
        await dispatch(createNotebook(payload));
      }
      onClose(); // Close modal after success
    } catch (err) {
      setErrors(['Something went wrong. Please try again.']);
    }
  };

  return (
    <div className="notebook-form-modal">
      <h2>{notebook ? 'Edit Notebook' : 'Create Notebook'}</h2>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        )}
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter notebook title"
          />
        </label>
        <button type="submit">{notebook ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default NotebookFormModal;
