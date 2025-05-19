// src/pages/NotebookView.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NotebookView() {
  const { notebookId } = useParams();
  const notebook = useSelector((state) => state.notebooks[notebookId]);

  if (!notebook) return <p>Notebook not found.</p>;

  return (
    <div className="notebook-view">
      <h2>{notebook.title}</h2>
      {/* You can map over notebook.notes or filter notes by notebookId */}
    </div>
  );
}
