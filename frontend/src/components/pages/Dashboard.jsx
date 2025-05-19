import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotebooks } from '../../store/notebooks';
import { fetchNotes } from '../../store/notes';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import TaskFormModal from '../TaskForm/TaskFormModal';
import NotebookCard from '../NotebookCard/NotebookCard';
import TaskSidebar from '../TaskSidebar/TaskSidebar';
import { createTask } from '../../store/tasks'; // if this exists
import { createNotebook } from '../../store/notebooks'; // if you want modal + create logic
import NotebookFormModal from '../NotebookFormModal/NotebookFormModal'; // modal to create notebooks
import './Dashboard.css';


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent, closeModal } = useModal();

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

const handleCreateNotebook = () => {
  setModalContent(
    <NotebookFormModal onClose={closeModal} />
  );
};


  const handleCreateTask = () => {
    setModalContent(
      <TaskFormModal
        onSubmit={(data) => dispatch(createTask(data))}
      />
    );
  };

  return (
    <div className="dashboard-container">
      <TaskSidebar />

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
                  onEdit={(notebook) =>
                    setModalContent(
                      <NotebookFormModal
                        notebook={notebook}
                        onSubmit={(data) => dispatch(editNotebook(data))}
                        onClose={closeModal}
                      />
                    )
                  }
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
                  <li key={note.id} onClick={() => navigate(`/notes/${note.id}`)}>
                    {note.title || 'Untitled Note'}
                  </li>
                ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};


export default Dashboard;
