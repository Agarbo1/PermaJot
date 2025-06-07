// src/pages/NoteView.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NoteViewModal() {
  const { noteId } = useParams();
  const note = useSelector((state) => state.notes[noteId]);

  if (!note) return <p>Note not found.</p>;

  return (
    <div className="note-view">
      <h2>{note.title || 'Untitled'}</h2>
      <p>{note.content || 'No content'}</p>
      <p>Last edited: {new Date(note.updatedAt).toLocaleString()}</p>
    </div>
  );
}
