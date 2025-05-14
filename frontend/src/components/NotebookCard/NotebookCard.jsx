// src/components/NotebookCard/NotebookCard.jsx
import { useNavigate } from 'react-router-dom';
import './NotebookCard.css';

export default function NotebookCard({ notebook }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notebooks/${notebook.id}`);
  };

  return (
    <div className="notebook-card" onClick={handleClick}>
      <h3 className="notebook-card-title">{notebook.title}</h3>
      <p className="notebook-card-description">{notebook.description || 'No description'}</p>
      <div className="notebook-card-date">
        Last updated: {new Date(notebook.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
