// src/components/NoteTagModal/NoteTagModal.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../../store/tags';
import { addNoteTag, removeNoteTag } from '../../store/notes';

export default function NoteTagModal({ noteId, onClose }) {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.tags.tags);
  const note = useSelector((state) => state.notes[noteId]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState(new Set(note.tags?.map(t => t.id)));

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const filteredTags = allTags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTag = (tagId) => {
    const newSet = new Set(selectedTagIds);
    newSet.has(tagId) ? newSet.delete(tagId) : newSet.add(tagId);
    setSelectedTagIds(newSet);
  };

  const handleSave = async () => {
    const originalTagIds = new Set(note.tags.map(tag => tag.id));

    const toAdd = [...selectedTagIds].filter(id => !originalTagIds.has(id));
    const toRemove = [...originalTagIds].filter(id => !selectedTagIds.has(id));

    await Promise.all([
      ...toAdd.map(tagId => dispatch(addNoteTag(noteId, { id: tagId }))),
      ...toRemove.map(tagId => dispatch(removeNoteTag(noteId, tagId)))
    ]);

    onClose();
  };

  return (
    <div className="note-tag-modal">
      <h2>Edit Tags</h2>
      <input
        type="text"
        placeholder="Search tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="tag-list">
        {filteredTags.map(tag => (
          <li key={tag.id}>
            <button
              className={`tag-toggle ${selectedTagIds.has(tag.id) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="modal-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
