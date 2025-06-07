import { Navigate, Outlet } from 'react-router-dom';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import NotebookViewModal from './components/NotebookViewModal/NotebookViewModal';
import NoteViewModal from './components/NoteViewModal/NoteViewModal';
import Navigation from './components/Navigation/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { Modal } from './components/Modal';

export default function Routes({ isLoaded }) {
  return [
    {
      path: '/',
      element: (
        <>
          <header>
            <Navigation isLoaded={isLoaded} />
            <Modal />
          </header>
          {isLoaded && <Outlet />}
        </>
      ),
      children: [
        { path: '', element: <Home /> },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: 'notebooks/:notebookId',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <NotebookViewModal />
            </ProtectedRoute>
          ),
        },
        {
          path: 'notes/:noteId',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <NoteViewModal />
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: <Navigate to="/" />,
        },
      ],
    },
  ];
}
