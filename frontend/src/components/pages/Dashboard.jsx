import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotebooks } from '../../store/notebooks';
import { fetchNotes } from '../../store/notes';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import TaskFormModal from '../TaskForm/TaskFormModal';
import NotebookCard from '../NotebookCard/NotebookCard';
import TaskSidebar from '../TaskSidebar/TaskSidebar';
import { fetchTasks, createTask, toggleTaskStatus } from '../../store/tasks'; // if this exists
import {
  createNotebook,
  editNotebook,
  deleteNotebook,
} from '../../store/notebooks'; // if you want modal + create logic
import NotebookFormModal from '../NotebookFormModal/NotebookFormModal'; // modal to create notebooks
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent, closeModal } = useModal();

  const user = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => Object.values(state.notebooks));
  const notes = useSelector((state) => Object.values(state.notes));
  const tasks = useSelector((state) => state.tasks.tasks || []);

  useEffect(() => {
    console.log('DASHBOARD useEffect running, user:', user);
    if (user === undefined) return; // still restoring session
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

  return (
  <div className="dashboard-container">
    {/* You can move this to a <Navbar /> component if needed */}
    <div className="navbar">
      <div className="logo">📓</div>
      <div className="title">PermaJot</div>
      <button className="sign-out" onClick={() => {/* logout logic */}}>
        Sign Out
      </button>
    </div>

    <div className="main-content">
      <TaskSidebar tasks={tasks} onToggle={handleToggleTask} />

      <div className="dashboard-main">
        <h1>Welcome back, {user.firstName}!</h1>

        <section className="dashboard-section">
          <div className="dashboard-header">
            <h2>Your Notebooks</h2>
            <button onClick={handleCreateNotebook}>Create Notebook</button>
          </div>

          {notebooks.length === 0 ? (
            <p>You have no notebooks yet.</p>
          ) : (
            <div className="notebook-grid">
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

        <section className="dashboard-section">
          <div className="dashboard-header">
            <h2>Recent Notes</h2>
            <button onClick={handleCreateTask}>Create Task</button>
          </div>

          {notes.length === 0 ? (
            <p>No notes found.</p>
          ) : (
            <ul>
              {notes
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 5)
                .map((note) => (
                  <li
                    key={note.id}
                    onClick={() => navigate(`/notes/${note.id}`)}
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
