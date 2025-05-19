// src/components/NoteCard/NoteCard.jsx
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import NoteTagModal from '../NoteTagModal/NoteTagModal';
import './NoteCard.css';

export default function NoteCard({ note }) {
  const navigate = useNavigate();
  const { setModalContent } = useModal();

  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  const openTagModal = (e) => {
    e.stopPropagation(); // prevent triggering note navigation
    setModalContent(<NoteTagModal noteId={note.id} existingTagIds={note.tags?.map(tag => tag.id) || []} />);
  };

  return (
    <div className="note-card" onClick={handleClick}>
      <h3 className="note-card-title">{note.title || 'Untitled'}</h3>
      <p className="note-card-content">{note.content || 'No content'}</p>
      <div className="note-card-date">
        Last edited: {new Date(note.updatedAt).toLocaleDateString()}
      </div>
      <button onClick={openTagModal} className="tag-button">Manage Tags</button>
    </div>
  );
}
