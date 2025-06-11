// Fully inline-styled version of your Dashboard.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import TaskFormModal from '../TaskForm/TaskFormModal';
import NotebookCard from '../NotebookCard/NotebookCard';
import TaskSidebar from '../TaskSidebar/TaskSidebar';
import NotebookFormModal from '../NotebookFormModal/NotebookFormModal';
import { fetchNotebooks, createNotebook, editNotebook, deleteNotebook } from '../../store/notebooks';
import { fetchNotes } from '../../store/notes';
import { fetchTasks, createTask, toggleTaskStatus } from '../../store/tasks';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent, closeModal } = useModal();

  const user = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const notes = useSelector((state) => Object.values(state.notes));
  const tasks = useSelector((state) => state.tasks.tasks || []);

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchNotebooks());
      dispatch(fetchNotes());
      dispatch(fetchTasks());
    }
  }, [dispatch, user, navigate]);

  if (!user) return null;

  const handleCreateNotebook = () => {
    setModalContent(
      <NotebookFormModal
        onSubmit={(data) => dispatch(createNotebook(data))}
        onClose={closeModal}
      />
    );
  };

  const handleEditNotebook = (notebook) => {
    setModalContent(
      <NotebookFormModal
        notebook={notebook}
        onSubmit={(data) => dispatch(editNotebook(data))}
        onClose={closeModal}
      />
    );
  };

  const handleCreateTask = () => {
    setModalContent(
      <TaskFormModal onSubmit={(data) => dispatch(createTask(data))} />
    );
  };

  const handleToggleTask = (taskId) => {
    dispatch(toggleTaskStatus(taskId));
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
    },
    mainContent: {
      display: 'flex',
      flex: 1,
    },
    dashboardMain: {
      flex: 1,
      padding: '2rem',
      backgroundColor: '#fff',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    notebookGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem',
    },
    notesList: {
      listStyle: 'none',
      padding: 0,
    },
    noteItem: {
      padding: '0.5rem 0',
      cursor: 'pointer',
      color: '#2f80ed',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📓</span>
          <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>PermaJot</span>
        </div>
        {/* Replace this with ProfileButton if needed */}
        <button style={{ backgroundColor: '#2f80ed', color: 'white', border: 'none', borderRadius: '20px', padding: '0.5rem 1rem', cursor: 'pointer' }}>Sign Out</button>
      </div>

      <div style={styles.mainContent}>
        <TaskSidebar tasks={tasks} onToggle={handleToggleTask} />

        <div style={styles.dashboardMain}>
          <h1>Welcome back, {user.firstName}!</h1>

          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2>Your Notebooks</h2>
              <button onClick={handleCreateNotebook}>Create Notebook</button>
            </div>
            {notebooks.length === 0 ? (
              <p>You have no notebooks yet.</p>
            ) : (
              <div style={styles.notebookGrid}>
                {notebooks.map((notebook) => (
                  <NotebookCard
                    key={notebook.id}
                    notebook={notebook}
                    onClick={() => navigate(`/notebooks/${notebook.id}`)}
                    onDelete={() => dispatch(deleteNotebook(notebook.id))}
                    onEdit={handleEditNotebook}
                  />
                ))}
              </div>
            )}
          </section>

          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2>Recent Notes</h2>
              <button onClick={handleCreateTask}>Create Task</button>
            </div>
            {notes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
              <ul style={styles.notesList}>
                {notes
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .slice(0, 5)
                  .map((note) => (
                    <li
                      key={note.id}
                      onClick={() => navigate(`/notes/${note.id}`)}
                      style={styles.noteItem}
                    >
                      {note.title || 'Untitled Note'}
                    </li>
                  ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
