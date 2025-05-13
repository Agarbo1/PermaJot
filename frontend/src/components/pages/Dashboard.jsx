import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotebooks } from '../store/notebooks';
import { fetchNotes } from '../store/notes';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const notes = useSelector((state) => Object.values(state.notes));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchNotebooks());
      dispatch(fetchNotes());
    }
  }, [dispatch, user, navigate]);

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <h1>Welcome back, {user.firstName}!</h1>

      <section className="dashboard-section">
        <h2>Your Notebooks</h2>
        {notebooks.length === 0 ? (
          <p>You have no notebooks yet.</p>
        ) : (
          <ul>
            {notebooks.map((notebook) => (
              <li key={notebook.id} onClick={() => navigate(`/notebooks/${notebook.id}`)}>
                {notebook.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Recent Notes</h2>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <ul>
            {notes
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 5)
              .map((note) => (
                <li key={note.id} onClick={() => navigate(`/notes/${note.id}`)}>
                  {note.title || 'Untitled Note'}
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

