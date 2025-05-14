// src/components/NoteCard/NoteCard.jsx
import { useNavigate } from 'react-router-dom';
import './NoteCard.css';

export default function NoteCard({ note }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <div className="note-card" onClick={handleClick}>
      <h3 className="note-card-title">{note.title || 'Untitled'}</h3>
      <p className="note-card-content">{note.content || 'No content'}</p>
      <div className="note-card-date">
        Last edited: {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
