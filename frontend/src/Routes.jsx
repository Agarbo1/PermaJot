import { Navigate, Outlet } from 'react-router-dom';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import NotebookView from './components/pages/NotebookView';
import NoteView from './components/pages/NoteView';
import Navigation from './components/Navigation/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

export default function Routes({ isLoaded }) {
  return [
    {
      path: '/',
      element: (
        <>
          <header>
            <Navigation isLoaded={isLoaded} />
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
          )
        },
        {
          path: 'notebooks/:notebookId',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <NotebookView />
            </ProtectedRoute>
          )
        },
        {
          path: 'notes/:noteId',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <NoteView />
            </ProtectedRoute>
          )
        },
        {
          path: '*',
          element: <Navigate to="/" />
        }
      ]
    }
  ];
}
