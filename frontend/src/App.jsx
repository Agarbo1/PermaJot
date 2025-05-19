import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session';

import Navigation from './components/Navigation/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard.jsx';
import NotebookView from './components/pages/NotebookView.jsx';
import NoteView from './components/pages/NoteView.jsx';

function Layout({ isLoaded }) {
  return (
    <>
      <header>
        <Navigation isLoaded={isLoaded} />
      </header>
      {isLoaded && <Outlet />}
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/dashboard',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: '/notebooks/:notebookId',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <NotebookView />
            </ProtectedRoute>
          ),
        },
        {
          path: '/notes/:noteId',
          element: (
            <ProtectedRoute isLoaded={isLoaded}>
              <NoteView />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
