import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchNotebooks,
  createNotebook,
  editNotebook,
} from '../../store/notebooks';

const NotebookFormModal = ({ notebook = null, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(notebook?.title || '');
  const [description, setDescription] = useState(notebook?.description || '');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrors(['Title is required']);
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
    };

    try {
      if (notebook) {
        await dispatch(editNotebook({ id: notebook.id, ...payload }));
      } else {
        await dispatch(createNotebook(payload));
      }

      await dispatch(fetchNotebooks());
      onClose();
    } catch (err) {
      setErrors(['Something went wrong. Please try again.']);
    }
  };

  const styles = {
    modal: {
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      width: '90vw',
      maxWidth: '325px',
      fontFamily: 'system-ui, sans-serif',
      boxSizing: 'border-box',
    },
    heading: {
      marginBottom: '1rem',
      fontSize: '1.5rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      fontWeight: '500',
    },
    input: {
      padding: '0.4rem',
      fontSize: '0.95rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      marginTop: '0.25rem',
    },
    textarea: {
      padding: '0.4rem',
      fontSize: '0.95rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      resize: 'vertical',
      marginTop: '0.25rem',
    },
    errorList: {
      listStyle: 'none',
      color: 'red',
      paddingLeft: 0,
      fontSize: '0.9rem',
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '1rem',
    },
    button: {
      padding: '0.5rem 1rem',
      fontSize: '0.95rem',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
    },
    cancel: {
      backgroundColor: '#ccc',
    },
    submit: {
      backgroundColor: '#2f80ed',
      color: 'white',
    },
  };

  return (
    <div style={styles.modal}>
      <h2 style={styles.heading}>
        {notebook ? 'Edit Notebook' : 'Create Notebook'}
      </h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {errors.length > 0 && (
          <ul style={styles.errorList}>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
        <label style={styles.label}>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notebook title"
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter notebook description (optional)"
            rows={3}
            style={styles.textarea}
          />
        </label>
        <div style={styles.buttonRow}>
          <button
            type="button"
            style={{ ...styles.button, ...styles.cancel }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" style={{ ...styles.button, ...styles.submit }}>
            {notebook ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotebookFormModal;
