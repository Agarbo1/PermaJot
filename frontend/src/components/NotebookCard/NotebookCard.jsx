// src/components/NotebookCard/NotebookCard.jsx
import { useNavigate } from 'react-router-dom';
import './NotebookCard.css';

export default function NotebookCard({ notebook, onDelete, onEdit }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notebooks/${notebook.id}`);
  };

  return (
    <div className="notebook-card" role="button" tabIndex={0} onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
      <div className="notebook-card-header">
        <h3 className="notebook-card-title">{notebook.title}</h3>
        <div className="notebook-card-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(notebook);
            }}
            className="edit-button"
            aria-label="Edit notebook"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notebook.id);
            }}
            className="delete-button"
            aria-label="Delete notebook"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="notebook-card-description">{notebook.description || 'No description'}</p>
      <div className="notebook-card-date">
        Last updated: {new Date(notebook.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
